"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  FileText,
  Briefcase,
  MessageSquare,
  Plus,
  Edit,
  BarChart2,
  Clock,
  ExternalLink,
  AlertCircle,
} from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { getBrowserClient } from "@/lib/supabase"

// Types for our content counts
interface ContentCounts {
  blogPosts: number
  projects: number
  testimonials: number
  loading: boolean
  error: string | null
}

// Types for recent activity
interface RecentActivity {
  id: string
  type: "blog" | "project" | "testimonial"
  title: string
  date: string
  action: "created" | "updated"
}

export default function DashboardHomePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [counts, setCounts] = useState<ContentCounts>({
    blogPosts: 0,
    projects: 0,
    testimonials: 0,
    loading: true,
    error: null,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [storageStatus, setStorageStatus] = useState<{
    available: boolean
    checking: boolean
    error: string | null
  }>({
    available: false,
    checking: true,
    error: null,
  })

  // Fetch content counts
  useEffect(() => {
    async function fetchCounts() {
      try {
        const supabase = getBrowserClient()

        // Fetch blog posts count
        const { count: blogCount, error: blogError } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true })

        if (blogError) throw blogError

        // Fetch projects count
        const { count: projectCount, error: projectError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })

        if (projectError) throw projectError

        // Fetch testimonials count (if table exists)
        let testimonialCount = 0
        try {
          const { count, error } = await supabase.from("testimonials").select("*", { count: "exact", head: true })

          if (!error) testimonialCount = count || 0
        } catch (e) {
          // Testimonials table might not exist yet, ignore error
        }

        setCounts({
          blogPosts: blogCount || 0,
          projects: projectCount || 0,
          testimonials: testimonialCount,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error fetching counts:", error)
        setCounts((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load content counts",
        }))
      }
    }

    fetchCounts()
  }, [])

  // Fetch recent activity
  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const supabase = getBrowserClient()

        // Fetch recent blog posts
        const { data: recentBlogs, error: blogError } = await supabase
          .from("blog_posts")
          .select("id, title, updated_at, created_at")
          .order("updated_at", { ascending: false })
          .limit(5)

        if (blogError) throw blogError

        // Fetch recent projects
        const { data: recentProjects, error: projectError } = await supabase
          .from("projects")
          .select("id, title, updated_at, created_at")
          .order("updated_at", { ascending: false })
          .limit(5)

        if (projectError) throw projectError

        // Combine and sort by date
        const combinedActivity: RecentActivity[] = [
          ...(recentBlogs || []).map((blog) => ({
            id: blog.id,
            type: "blog" as const,
            title: blog.title,
            date: new Date(blog.updated_at).toISOString(),
            action:
              new Date(blog.updated_at).getTime() === new Date(blog.created_at).getTime()
                ? ("created" as const)
                : ("updated" as const),
          })),
          ...(recentProjects || []).map((project) => ({
            id: project.id,
            type: "project" as const,
            title: project.title,
            date: new Date(project.updated_at).toISOString(),
            action:
              new Date(project.updated_at).getTime() === new Date(project.created_at).getTime()
                ? ("created" as const)
                : ("updated" as const),
          })),
        ]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)

        setRecentActivity(combinedActivity)
      } catch (error) {
        console.error("Error fetching recent activity:", error)
        // Don't set error state, just leave empty
      }
    }

    fetchRecentActivity()
  }, [])

  // Check storage bucket status
  useEffect(() => {
    async function checkStorageBucket() {
      try {
        const supabase = getBrowserClient()

        const { data, error } = await supabase.storage.getBucket("media")

        if (error) {
          if (error.message.includes("not found")) {
            setStorageStatus({
              available: false,
              checking: false,
              error: "Storage bucket 'media' not found. Image uploads are disabled.",
            })
          } else {
            throw error
          }
        } else {
          setStorageStatus({
            available: true,
            checking: false,
            error: null,
          })
        }
      } catch (error) {
        console.error("Error checking storage bucket:", error)
        setStorageStatus({
          available: false,
          checking: false,
          error: "Failed to check storage status",
        })
      }
    }

    checkStorageBucket()
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E9E7E2]">Admin Dashboard</h1>
            <p className="text-[#E9E7E2]/70 mt-1">Welcome back, {user?.email?.split("@")[0] || "Admin"}</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button
              onClick={() => router.push("/admin/dashboard/blog/new")}
              className="bg-[#FF5001] hover:bg-[#FF5001]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Blog Post
            </Button>
            <Button
              onClick={() => router.push("/admin/dashboard/projects/new")}
              className="bg-[#FF5001] hover:bg-[#FF5001]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>
        </div>

        {/* Storage Status Alert */}
        {!storageStatus.checking && !storageStatus.available && (
          <Alert className="mb-6 border-amber-500 bg-amber-500/20">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-500">Storage Not Configured</AlertTitle>
            <AlertDescription>
              The Supabase storage bucket &apos;media&apos; is not set up. Image uploads are disabled. You can still use
              external image URLs for your content.
            </AlertDescription>
          </Alert>
        )}

        {/* Content Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1A1A1A] border-[#333333] text-[#E9E7E2]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <FileText className="mr-2 h-5 w-5 text-[#FF5001]" />
                Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{counts.loading ? "..." : counts.blogPosts}</div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#FF5001] hover:text-[#FF5001]/90 hover:bg-[#FF5001]/10 p-0"
                onClick={() => router.push("/admin/dashboard/blog")}
              >
                Manage Blog Posts
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333333] text-[#E9E7E2]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Briefcase className="mr-2 h-5 w-5 text-[#FF5001]" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{counts.loading ? "..." : counts.projects}</div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#FF5001] hover:text-[#FF5001]/90 hover:bg-[#FF5001]/10 p-0"
                onClick={() => router.push("/admin/dashboard/projects")}
              >
                Manage Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333333] text-[#E9E7E2]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <MessageSquare className="mr-2 h-5 w-5 text-[#FF5001]" />
                Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{counts.loading ? "..." : counts.testimonials}</div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#FF5001] hover:text-[#FF5001]/90 hover:bg-[#FF5001]/10 p-0"
                onClick={() => router.push("/admin/dashboard/testimonials")}
                disabled={true}
              >
                Manage Testimonials
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1A1A1A] border-[#333333] text-[#E9E7E2]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-[#FF5001]" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-[#E9E7E2]/70">Latest content updates</CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <div className="text-center py-6 text-[#E9E7E2]/50">No recent activity found</div>
              ) : (
                <ul className="space-y-4">
                  {recentActivity.map((item) => (
                    <li key={`${item.type}-${item.id}`} className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {item.type === "blog" ? (
                          <FileText className="h-5 w-5 text-[#FF5001]" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-[#FF5001]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-[#E9E7E2]/70 flex items-center justify-between">
                          <span>
                            {item.action === "created" ? "Created" : "Updated"} {formatDate(item.date)}
                          </span>
                          <Link
                            href={`/admin/dashboard/${item.type === "blog" ? "blog" : "projects"}/edit/${item.id}`}
                            className="text-[#FF5001] hover:underline flex items-center"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333333] text-[#E9E7E2]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-[#FF5001]" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-[#E9E7E2]/70">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  className="justify-start border-[#333333] hover:border-[#FF5001] hover:bg-[#FF5001]/10 text-[#E9E7E2]"
                  onClick={() => router.push("/admin/dashboard/blog/new")}
                >
                  <Plus className="mr-2 h-4 w-4 text-[#FF5001]" />
                  Create New Blog Post
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-[#333333] hover:border-[#FF5001] hover:bg-[#FF5001]/10 text-[#E9E7E2]"
                  onClick={() => router.push("/admin/dashboard/projects/new")}
                >
                  <Plus className="mr-2 h-4 w-4 text-[#FF5001]" />
                  Create New Project
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-[#333333] hover:border-[#FF5001] hover:bg-[#FF5001]/10 text-[#E9E7E2]"
                  onClick={() => window.open("/", "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4 text-[#FF5001]" />
                  View Public Website
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-[#333333] hover:border-[#FF5001] hover:bg-[#FF5001]/10 text-[#E9E7E2]"
                  onClick={() => window.open("https://app.supabase.com", "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4 text-[#FF5001]" />
                  Open Supabase Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
