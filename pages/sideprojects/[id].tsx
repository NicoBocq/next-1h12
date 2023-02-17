import {title} from 'process'

import {NextConfig} from 'next'

import ArticleLayout from '@/components/ArticleLayout'
import {
  ProjectFormatedResponse,
  getDatabase,
  getPage,
  sectionsId,
} from '@/services'

export type SideProjectsProps = {
  meta: ProjectFormatedResponse
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
    id: sectionsId.XP,
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
  console.log(project)
  return {
    props: {
      meta: project,
    },
  }
}

export default SideProjects
