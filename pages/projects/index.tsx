import {LinkIcon} from '@heroicons/react/24/solid'
import {AnimatePresence, motion} from 'framer-motion'
import {InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Card from '@/components/Card'
import SimpleLayout from '@/components/SimpleLayout'
import Filters from '@/components/StacksFilter'
import useStackFilers from '@/hooks/useStackFilters'
import {getPage, supabase} from '@/lib/supabase'
import {Project} from '@/types'
import {transitionItemVariants, transitionTiming} from '@/utils'

const Projects: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
  page,
}) => {
  const description = page?.description ?? ''
  const title = page?.title ?? ''

  const {stacks, filteredList, handleOnSelect, selectedFilters} =
    useStackFilers<Project>({
      list: projects,
    })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <SimpleLayout
        title={title}
        intro={description}
        filters={
          <Filters
            filters={stacks}
            handleOnSelect={handleOnSelect}
            selectedFilters={selectedFilters}
          />
        }
      >
        <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16">
          <AnimatePresence>
            {filteredList?.map((project, index) => (
              <motion.li
                key={project.id}
                variants={transitionItemVariants}
                layoutId={project.id.toString()}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={transitionTiming(index)}
              >
                <Card as="div">
                  {/* <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    {project.cover && (
                      <Image
                        src={project.cover}
                        alt=""
                        className="h-8 w-8"
                        width={32}
                        height={32}
                      />
                    )}
                  </div> */}
                  <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <Card.Link href={`sideprojects/${project.slug}`}>
                      {project.title}
                    </Card.Link>
                  </h2>
                  <Card.Description>{project.description}</Card.Description>
                  <Card.Cta>More</Card.Cta>
                  {/* <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                    <LinkIcon className="h-4 w-4 flex-none" />
                    <span className="ml-2">{project.url}</span>
                  </p> */}
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </SimpleLayout>
    </>
  )
}

export default Projects

export const getStaticProps = async () => {
  const page = await getPage('sideprojects')
  const {data: projects} = await supabase.from('project').select('*, stack (*)')
  return {
    props: {
      projects,
      page,
    },
    revalidate: 3600,
  }
}
