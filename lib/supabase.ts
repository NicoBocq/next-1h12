import {createClient} from '@supabase/supabase-js'

import {Database} from '@/types'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export const getPage = async (slug: string) => {
  const {data: page, error} = await supabase
    .from('page')
    .select('*')
    .eq('slug', slug)
    .single()
  return page
}
