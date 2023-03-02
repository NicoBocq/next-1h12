import {LinkIcon} from '@heroicons/react/24/solid'
import {InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Card from '@/components/Card'
import SimpleLayout from '@/components/SimpleLayout'
import {supabase} from '@/lib/supabase'

const SideProjects: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({projects, page, error, pageError}) => {
  const description = page?.description ?? ''
  const title = page?.title ?? ''

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <SimpleLayout title={title} intro={description}>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects?.map((project) => (
            <Card as="li" key={project.slug}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                {project.cover && (
                  <Image
                    src={project.cover}
                    alt=""
                    className="h-8 w-8"
                    width={32}
                    height={32}
                  />
                )}
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={`sideprojects/${project.slug}`}>
                  {project.title}
                </Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-4 w-4 flex-none" />
                <span className="ml-2">{project.url}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}

export default SideProjects

export const getStaticProps = async () => {
  const {data: page, error: pageError} = await supabase
    .from('page')
    .select('title, description')
    .eq('slug', 'sideprojects')
    .single()
  const {data: projects, error} = await supabase.from('project').select('*')
  return {
    props: {
      projects,
      page,
      error,
      pageError,
    },
    revalidate: 60,
  }
}
