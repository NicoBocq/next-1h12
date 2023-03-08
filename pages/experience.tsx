import {AnimatePresence, motion} from 'framer-motion'
import {InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'

import Badge from '@/components/Badge'
import Card from '@/components/Card'
import SimpleLayout from '@/components/SimpleLayout'
import Filters from '@/components/StacksFilter'
import useStackFilers from '@/hooks/useStackFilters'
import {getPage, supabase} from '@/lib/supabase'
import {Work} from '@/types'
import {transitionItemVariants} from '@/utils/'

const Works: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  works,
  page,
}) => {
  const title = page?.title ?? ''
  const description = page?.description ?? ''

  const {stacks, filteredList, handleOnSelect, selectedFilters} =
    useStackFilers<Work>({
      list: works,
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
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            <AnimatePresence>
              {filteredList?.map((work, index) => (
                <motion.article
                  className="md:grid md:grid-cols-4 md:items-baseline"
                  variants={transitionItemVariants}
                  key={work.id}
                  layoutId={work.id.toString()}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={(index + 1) * 0.1}
                >
                  <Card
                    as="div"
                    className="bg-white dark:bg-zinc-900 md:col-span-3"
                  >
                    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                      {work.title}{' '}
                      <span className="ml-1 font-light text-zinc-800 dark:text-zinc-100">
                        {work.company}
                      </span>
                    </h2>
                    <Card.Description className="whitespace-pre-line">
                      {work.description}
                    </Card.Description>
                    <Card.Description>
                      {work.stack.map((stack) => (
                        <Badge key={stack.id} label={stack.name} />
                      ))}
                    </Card.Description>
                    {/* <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                    <LinkIcon className="h-4 w-4 flex-none" />
                    <span className="ml-2">{work.url}</span>
                  </p> */}
                  </Card>
                  <Card.Eyebrow
                    className="mt-1 hidden space-x-1 md:block"
                    aria-label={`${work.start} until ${
                      work.end ? work.end : 'now'
                    }`}
                  >
                    {work.start && (
                      <time dateTime={work.start}>{work.start}</time>
                    )}
                    {work.end && (
                      <>
                        <span aria-hidden="true">—</span>
                        <time dateTime={work.end}>{work.end}</time>
                      </>
                    )}
                  </Card.Eyebrow>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default Works

export const getStaticProps = async () => {
  const {data: works} = await supabase
    .from('work')
    .select('*, stack (*)')
    .order('order')
  const page = await getPage('experience')
  return {
    props: {
      works,
      page,
    },
    revalidate: 3600,
  }
}
