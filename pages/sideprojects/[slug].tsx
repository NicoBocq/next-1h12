import {ParsedUrlQuery} from 'querystring'

import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
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

  return (
    <ArticleLayout
      title={title}
      description={description}
      previousPathname={previousPathname}
    >
      <Image src={cover} alt={title} width={600} height={300} />
      {description}
    </ArticleLayout>
  )
}

export const getStaticPaths = async () => {
  const {data: pathList, error} = await supabase.from('project').select('slug')
  const paths = pathList?.map((project) => ({
    params: {slug: project.slug},
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
  const {data: meta, error} = await supabase
    .from('project')
    .select('*')
    .eq('slug', slug)
    .single()
  return {
    props: {
      meta,
    },
  }
}

export default SideProjects
