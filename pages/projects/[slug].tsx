import {ParsedUrlQuery} from 'querystring'

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Image from 'next/image'

import ArticleLayout from '@/components/ArticleLayout'
import {supabase} from '@/lib/supabase'

const SideProjects: NextPage<
  InferGetStaticPropsType<typeof getStaticProps> & {
    previousPathname: string
  }
> = ({meta, previousPathname}) => {
  const description = meta?.description ?? ''
  const title = meta?.title ?? ''
  const cover = meta?.cover ?? ''
  const release = meta?.release ?? ''

  return (
    <ArticleLayout
      title={title}
      description={description}
      date={release}
      previousPathname={previousPathname}
    >
      <Image src={cover} alt={title} width={700} height={400} />
      {description}
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
    .select('*')
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
