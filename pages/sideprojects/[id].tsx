import {NextConfig} from 'next'

import ArticleLayout from '@/components/ArticleLayout'
import {getDatabase, getPage} from '@/services'
import {ProjectItem} from '@/types'

export type SideProjectsProps = {
  meta: ProjectItem
  previousPathname: string
}

const SideProjects = ({meta, previousPathname}: SideProjectsProps) => {
  return (
    <ArticleLayout meta={meta} previousPathname={previousPathname}>
      {meta.description}
    </ArticleLayout>
  )
}

export const getStaticPaths = async () => {
  const projects = await getDatabase({
    context: 'sideprojects',
  })
  const paths = projects.map((project) => ({
    params: {id: project.id},
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: NextConfig) => {
  const id = context.params.id
  const project = await getPage(id)
  return {
    props: {
      meta: project,
    },
  }
}

export default SideProjects
