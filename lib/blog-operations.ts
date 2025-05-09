import { getBrowserClient } from "./supabase"

export async function fetchBlogPosts() {
  const supabase = getBrowserClient()

  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw error
  }

  return data
}

export async function fetchBlogPost(slug: string) {
  const supabase = getBrowserClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    throw error
  }

  return data
}

export async function createBlogPost(postData: any) {
  const supabase = getBrowserClient()

  // Process tags if they're a comma-separated string
  if (typeof postData.tags === "string") {
    postData.tags = postData.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean)
  }

  const { data, error } = await supabase.from("blog_posts").insert([postData]).select()

  if (error) {
    console.error("Error creating blog post:", error)
    throw error
  }

  return data[0]
}

export async function updateBlogPost(id: number, postData: any) {
  const supabase = getBrowserClient()

  // Process tags if they're a comma-separated string
  if (typeof postData.tags === "string") {
    postData.tags = postData.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean)
  }

  const { data, error } = await supabase.from("blog_posts").update(postData).eq("id", id).select()

  if (error) {
    console.error(`Error updating blog post with id ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteBlogPost(id: number) {
  const supabase = getBrowserClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting blog post with id ${id}:`, error)
    throw error
  }

  return true
}
