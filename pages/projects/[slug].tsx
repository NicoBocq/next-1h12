import {ParsedUrlQuery} from 'querystring'

import {GetStaticProps, InferGetStaticPropsType} from 'next'
import Image from 'next/image'

import ArticleLayout from '@/components/ArticleLayout'
import Badge from '@/components/Badge'
import {supabase} from '@/lib/supabase'

function SideProjects({
  meta,
  previousPathname,
}: InferGetStaticPropsType<typeof getStaticProps> & {
  previousPathname: string
}) {
  const description = meta?.description ?? ''
  const title = meta?.title ?? ''
  const cover = meta?.cover ?? ''
  const release = meta?.release ?? ''
  const stack = meta?.stack ?? []
  const content = meta?.content ?? ''

  return (
    <ArticleLayout
      title={title}
      description={description}
      date={release}
      tags={stack}
      previousPathname={previousPathname}
    >
      <Image src={cover} alt={title} width={700} height={400} />
      {content}
    </ArticleLayout>
  )
}

export const getStaticPaths = async () => {
  const {data: pathList} = await supabase.from('project').select('slug')
  const paths = pathList?.map((path) => ({
    params: {
      slug: path.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as Params
  const {data: meta} = await supabase
    .from('project')
    .select('*, stack(*)')
    .eq('slug', slug)
    .single()
  return {
    props: {
      meta,
    },
    revalidate: 3600,
  }
}

export default SideProjects
