"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createBlogPost } from "@/lib/blog-operations"
import { PageTransition } from "@/components/page-transition"
import { Save, X, ImageIcon, LinkIcon } from "lucide-react"

export default function NewBlogPostPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    tags: "",
    status: "draft",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData({
        ...formData,
        title: value,
        slug,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (!user) {
        throw new Error("You must be logged in to create a post")
      }

      const postData = {
        ...formData,
        author_id: user.id,
      }

      await createBlogPost(postData)
      router.push("/admin/dashboard/blog")
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the post")
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/admin/dashboard/blog")
  }

  return (
    <PageTransition>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">New Blog Post</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-[#333333] rounded-lg text-[#E9E7E2]/70 hover:bg-[#252525] transition-colors flex items-center"
              disabled={isSubmitting}
            >
              <X className="mr-2 h-5 w-5" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#FF5001] text-[#161616] font-medium rounded-lg hover:bg-[#FF5001]/90 transition-colors flex items-center disabled:opacity-50"
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-5 w-5" />
              {isSubmitting ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                placeholder="Post title"
                required
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                placeholder="post-slug"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
              placeholder="Brief description of the post"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <div className="border border-[#333333] rounded-lg overflow-hidden">
              <div className="bg-[#252525] p-2 border-b border-[#333333] flex space-x-2">
                <button type="button" className="p-1 text-[#E9E7E2]/70 hover:text-[#E9E7E2] rounded">
                  <ImageIcon className="h-5 w-5" />
                </button>
                <button type="button" className="p-1 text-[#E9E7E2]/70 hover:text-[#E9E7E2] rounded">
                  <LinkIcon className="h-5 w-5" />
                </button>
              </div>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-3 bg-[#252525] border-none focus:outline-none focus:ring-0 text-[#E9E7E2]"
                placeholder="Write your post content here..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium mb-2">
                Featured Image URL
              </label>
              <input
                id="image_url"
                name="image_url"
                type="text"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                placeholder="Brand Strategy, Marketing, Design"
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full md:w-1/3 px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
