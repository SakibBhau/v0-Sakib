"use server"

import { createServerClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

const BUCKET_NAME = "project-images"

export async function uploadImage(file: File) {
  try {
    const supabase = createServerClient()

    // Check if the bucket exists, if not this will fail gracefully
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(BUCKET_NAME)

    if (bucketError && bucketError.message.includes("does not exist")) {
      console.error("Bucket does not exist. Please create it in the Supabase dashboard.")
      return {
        error: "Storage bucket not configured. Please contact the administrator.",
        url: null,
      }
    }

    // Generate a unique filename to prevent collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload the file
    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading file:", error)
      return { error: error.message, url: null }
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

    return { url: publicUrl, error: null }
  } catch (error) {
    console.error("Unexpected error during upload:", error)
    return {
      error: "An unexpected error occurred during upload.",
      url: null,
    }
  }
}

export async function deleteImage(url: string) {
  try {
    const supabase = createServerClient()

    // Extract the file path from the URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/")
    const filePath = pathParts[pathParts.length - 1]

    // Delete the file
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])

    if (error) {
      console.error("Error deleting file:", error)
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error("Unexpected error during deletion:", error)
    return { error: "An unexpected error occurred during deletion." }
  }
}
