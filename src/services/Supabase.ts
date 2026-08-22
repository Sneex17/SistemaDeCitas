import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vzwzjhexeaqwcbuvmofp.supabase.co'
const supabaseAnonKey = 'sb_publishable_KlKhqQz0Snpt6Ru72p6qug_3Em5mmQS'

export const Supabase = createClient(supabaseUrl, supabaseAnonKey)