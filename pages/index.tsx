import {
  AnchorHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'

import Head from 'next/head'
import Link, {LinkProps} from 'next/link'

import {Card} from '@/components/Card'
import Container from '@/components/Container'
import {GitHubIcon, LinkedInIcon, TwitterIcon} from '@/components/SocialIcons'
import {getDatabase, sectionsId} from '@/services'
import {ProjectItem} from '@/types'

export type HomeProps = {
  sideprojects: ProjectItem[]
}

export type SocialLinkProps = LinkProps & {
  icon: FunctionComponent<HTMLAttributes<SVGElement>>
}

const SocialLink = ({icon: Icon, ...props}: SocialLinkProps): JSX.Element => {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

const Article = ({article}): JSX.Element => {
  return (
    <Card as="article">
      <Card.Title href={`/sideprojects/${article.id}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="p">
        {/* {article.Stack?.multi_select.map((stack) => (
          <span key={stack.id}>{stack.Name}</span>
        ))} */}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

const Home = (props: HomeProps): JSX.Element => {
  const {sideprojects} = props
  console.log(sideprojects)
  return (
    <>
      <Head>
        <title>1h12</title>
        <meta
          name="description"
          content="Nicolas Bocquet - front-end developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Front-end developper
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m Nicolas Bocquet, a front-end developer based in Marseille,
            France. I love building and testing new things. This personnal
            website is a playground, builded with Next 13,{' '}
            <Link
              className="text-teal-500"
              href="https://tailwindui.com/templates/spotlight"
              target="blank"
            >
              Tailwind
            </Link>
            , datas are hosted by Notions. Check the sources on{' '}
            <Link
              href="https://github.com/NicoBocq/next-1h12"
              className="text-teal-500"
              target="blank"
            >
              GitHub
            </Link>
            .
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
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          Experiences
        </h2>
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {sideprojects.map((sideproject) => (
              <Article key={sideproject.id} article={sideproject} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter />
            <Resume /> */}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const sideprojects = await getDatabase({context: 'sideprojects'})

  return {
    props: {
      sideprojects,
    },
    revalidate: 1000,
  }
}
