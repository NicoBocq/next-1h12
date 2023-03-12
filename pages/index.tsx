import type {InferGetStaticPropsType} from 'next'
import Head from 'next/head'

import Card from '@/components/Card'
import ContactBox from '@/components/ContactBox'
import Container from '@/components/Container'
import Resume from '@/components/Resume'
import {GitHubIcon, LinkedInIcon, TwitterIcon} from '@/components/SocialIcons'
import SocialLink from '@/components/SocialLink'
import {getPage, supabase} from '@/lib/supabase'
import {Project} from '@/types'

type ProjectProps = {
  project: Project
}

function Project({project}: ProjectProps) {
  return (
    <Card as="article">
      <Card.Title href={`/projects/${project.slug}`}>
        {project.title}
      </Card.Title>
      <Card.Description>{project.description}</Card.Description>
      <Card.Cta>More</Card.Cta>
    </Card>
  )
}

function Home({
  projects,
  works,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const description = page?.description ?? ''
  const title = page?.title ?? ''
  return (
    <>
      <Head>
        <title>Nicolas Bocquet - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/nicobocq"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/NicoBocq"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/bocquetnicolas"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {projects?.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ContactBox />
            {works && <Resume works={works} />}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home

export const generatedMetadata = async () => {
  const page = await getPage('home')
  return {
    title: page?.title ?? '',
    description: page?.description ?? '',
  }
}

export const getStaticProps = async () => {
  const {data: projects} = await supabase
    .from('project')
    .select(`*, stack ( name )`)
  const {data: works} = await supabase
    .from('work')
    .select(`*`)
    .limit(4)
    .order('order')
  const page = await getPage('home')
  return {
    props: {
      projects,
      works,
      page,
    },
    revalidate: 3600,
  }
}
