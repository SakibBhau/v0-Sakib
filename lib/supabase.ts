import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Singleton pattern to avoid multiple instances
let browserClient: ReturnType<typeof createClient> | null = null

export const getBrowserClient = () => {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Server-side client with service role for admin operations
export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  return createClient(supabaseUrl, supabaseServiceKey)
}
