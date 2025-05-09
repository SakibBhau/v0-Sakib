"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadImage, deleteImage } from "@/lib/upload-operations"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface ImageUploaderProps {
  label: string
  initialImageUrl?: string
  onImageChange: (url: string | null) => void
  className?: string
  helpText?: string
}

export function ImageUploader({ label, initialImageUrl, onImageChange, className = "", helpText }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Simulate upload progress
  const simulateProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 100)
    return interval
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, WebP, or GIF)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setError(null)
    setIsUploading(true)

    // Start progress simulation
    const progressInterval = simulateProgress()

    try {
      const result = await uploadImage(file)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Upload failed",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.url) {
        setImageUrl(result.url)
        onImageChange(result.url)
        toast({
          title: "Upload successful",
          description: "Image has been uploaded successfully",
        })
      }
    } catch (err) {
      clearInterval(progressInterval)
      setError("An unexpected error occurred during upload")
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred during upload",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!imageUrl) return

    try {
      setIsUploading(true)
      const result = await deleteImage(imageUrl)

      if (result.error) {
        toast({
          title: "Removal failed",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setImageUrl(null)
        onImageChange(null)
        toast({
          title: "Image removed",
          description: "Image has been removed successfully",
        })
      }
    } catch (err) {
      toast({
        title: "Removal failed",
        description: "An unexpected error occurred while removing the image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={`image-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}>{label}</Label>

      {imageUrl ? (
        <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="relative aspect-video w-full">
            <Image src={imageUrl || "/placeholder.svg"} alt={label} fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {helpText || "Upload an image (JPEG, PNG, WebP, GIF, max 5MB)"}
            </p>
          </div>
          <Input
            id={`image-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
            ref={fileInputRef}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
