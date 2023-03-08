import {FC} from 'react'

import {EnvelopeIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'

import SocialLink from './SocialLink'

const ContactBox: FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <Link href="mailto:nicolas@1h12.com">
        <h2 className="flex text-sm font-semibold text-zinc-900 hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-500">
          <EnvelopeIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">nicolas@1h12.com</span>
        </h2>
      </Link>
    </div>
  )
}

export default ContactBox
