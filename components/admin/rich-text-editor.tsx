"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { uploadImage } from "@/lib/upload-operations"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  initialValue: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({
  initialValue,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "300px",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue)
  const [isUploading, setIsUploading] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue
    }
  }, [initialValue])

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      setContent(newContent)
      onChange(newContent)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleContentChange()
    editorRef.current?.focus()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, WebP, or GIF)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const result = await uploadImage(file)

      if (result.error) {
        toast({
          title: "Upload failed",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.url) {
        // Insert the image at the current cursor position
        execCommand("insertImage", result.url)
        toast({
          title: "Image uploaded",
          description: "Image has been inserted into the content",
        })
      }
    } catch (err) {
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

  const handleLinkInsert = () => {
    const url = prompt("Enter the URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-2 flex flex-wrap gap-1">
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleLinkInsert} title="Insert Link">
          <Link className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Insert Image"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
        />
        <div className="border-l border-gray-200 dark:border-gray-700 mx-1 h-6" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<h1>")}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<h2>")}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<h3>")}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<blockquote>")}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<pre>")}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </Button>
        <div className="border-l border-gray-200 dark:border-gray-700 mx-1 h-6" />
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("undo")} title="Undo">
          <Undo className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("redo")} title="Redo">
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="p-4 focus:outline-none prose dark:prose-invert max-w-none prose-img:rounded-md prose-img:mx-auto"
        style={{ minHeight }}
        onInput={handleContentChange}
        onBlur={handleContentChange}
        dangerouslySetInnerHTML={{ __html: initialValue }}
        placeholder={placeholder}
      />
    </div>
  )
}
