import {useMemo} from 'react'

import {LinkIcon} from '@heroicons/react/24/solid'
import {InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Card from '@/components/Card'
import SimpleLayout from '@/components/SimpleLayout'
import {supabase} from '@/lib/supabase'

const Works: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  works,
  page,
}) => {
  const title = page?.title ?? ''
  const description = page?.description ?? ''

  const stacks = useMemo(() => {
    return works
      ?.map((work) => work.stack)
      .flat()
      .map((stack) => stack.name)
      .filter((stack, index, self) => self.indexOf(stack) === index)
  }, [works])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <SimpleLayout title={title} intro={description}>
        {JSON.stringify(stacks)}
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {works?.map((work) => (
              <article
                className="md:grid md:grid-cols-4 md:items-baseline"
                key={work.id}
              >
                <Card as="div" className="md:col-span-3">
                  <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    {work.title}{' '}
                    <span className="font-light">{work.company}</span>
                  </h2>
                  <Card.Description preLine>
                    {work.description}
                  </Card.Description>
                  <Card.Description>
                    {work.stack.map((stack) => (
                      <span
                        key={stack.id}
                        className="mr-1 inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
                      >
                        {stack.name}
                      </span>
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
                  <time dateTime={work.start}>{work.start}</time>
                  {work.end && (
                    <>
                      <span aria-hidden="true">—</span>
                      <time dateTime={work.end}>{work.end}</time>
                    </>
                  )}
                </Card.Eyebrow>
              </article>
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default Works

export const getStaticProps = async () => {
  const {data: works, error} = await supabase
    .from('work')
    .select('*, stack (*)')
    .order('order')
  const {data: page, error: pageError} = await supabase
    .from('page')
    .select('*')
    .eq('slug', 'work')
    .single()
  return {
    props: {
      works,
      page,
    },
    revalidate: 60,
  }
}
