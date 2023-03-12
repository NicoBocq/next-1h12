import {AnimatePresence, motion} from 'framer-motion'
import {InferGetStaticPropsType} from 'next'
import Head from 'next/head'

import Badge from '@/components/Badge'
import Card from '@/components/Card'
import Period from '@/components/Period'
import SimpleLayout from '@/components/SimpleLayout'
import Filters from '@/components/StacksFilter'
import useStackFilers from '@/hooks/useStackFilters'
import {getPage, supabase} from '@/lib/supabase'
import {Work} from '@/types'
import {transitionItemVariants, transitionTiming} from '@/utils/'

function Work({
  works,
  page,
  stacks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = page?.title ?? ''
  const description = page?.description ?? ''

  const {filteredList, handleOnSelect, selectedFilters} = useStackFilers<Work>({
    list: works,
  })

  const ariaLabelPeriod = (work: Work) => {
    const {start, end} = work
    return `${start} until ${end ? end : 'Present'}`
  }

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
                  custom={transitionTiming(index)}
                >
                  <Card
                    as="div"
                    className="bg-white dark:bg-zinc-900 md:col-span-3"
                  >
                    <Card.Eyebrow
                      as="time"
                      aria-label={ariaLabelPeriod(work)}
                      className="md:hidden"
                      decorate
                    >
                      <Period start={work.start} end={work.end} />
                    </Card.Eyebrow>
                    <Card.Title>
                      {work.title}{' '}
                      <span className="ml-1 font-light text-zinc-800 dark:text-zinc-100">
                        {work.company}
                      </span>
                    </Card.Title>
                    <Card.Description className="whitespace-pre-line">
                      {work.description}
                    </Card.Description>
                    <Card.Description>
                      {work.stack.map((stack) => (
                        <Badge key={stack.id} label={stack.name} />
                      ))}
                    </Card.Description>
                  </Card>
                  <Card.Eyebrow
                    className="mt-1 hidden space-x-1 md:block"
                    aria-label={ariaLabelPeriod(work)}
                  >
                    <Period start={work.start} end={work.end} />
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

export default Work

export const getStaticProps = async () => {
  const page = await getPage('work')
  const {data: works} = await supabase
    .from('work')
    .select('*, stack (*)')
    .order('order')
  const {data: stacks} = await supabase
    .from('distinct_works_stacks')
    .select('*')
    .order('weight', {ascending: true})
  return {
    props: {
      works,
      page,
      stacks,
    },
    revalidate: 3600,
  }
}
