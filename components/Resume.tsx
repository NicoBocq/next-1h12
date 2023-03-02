import {FC} from 'react'

import {BriefcaseIcon, ChevronRightIcon} from '@heroicons/react/24/outline'

import {Work} from '@/types'

import Button from './Button'

export type ResumeProps = {
  works: Work[]
}

const Resume: FC<ResumeProps> = ({works}) => {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {works.map((role) => (
          <li key={role.id} className="flex gap-4">
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto space-x-1 text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start} until ${role.end}`}
              >
                <time dateTime={role.start}>{role.start}</time>
                {role.end && (
                  <>
                    <span aria-hidden="true">—</span>
                    <time dateTime={role.end}>{role.end}</time>
                  </>
                )}
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="/experience"
        variant="secondary"
        className="group mt-6 w-full"
      >
        More
        <ChevronRightIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default Resume
