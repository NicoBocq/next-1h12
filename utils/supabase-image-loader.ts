const bucketHostName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET

type SupabaseImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

export default function supabaseLoader({
  src,
  width,
  quality,
}: SupabaseImageLoaderProps) {
  return `${bucketHostName}${src}?width=${width}&quality=${quality || 75}`
}
