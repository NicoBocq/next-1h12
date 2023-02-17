import {LinkIcon} from '@heroicons/react/24/solid'
import Head from 'next/head'
import Image from 'next/image'

import {Card} from '@/components/Card'
import SimpleLayout from '@/components/SimpleLayout'
import {getDatabase, sectionsId} from '@/services'

const SideProjects = ({projects}) => {
  return (
    <>
      <Head>
        <title>Sideprojects - Nicolas Bocquet</title>
        <meta
          name="description"
          content="Things I’ve made trying to put my dent in the universe."
        />
      </Head>
      <SimpleLayout
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.id}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                {/* <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8"
                  unoptimized
                /> */}
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.url}>{project.title}</Card.Link>
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
  const projects = await getDatabase({id: sectionsId.XP})
  return {
    props: {
      projects,
    },
    revalidate: 1000,
  }
}
