import {FC} from 'react'

import {EnvelopeIcon} from '@heroicons/react/24/solid'

import SocialLink from './SocialLink'

const ContactBox: FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <SocialLink href="mailto:nicolas@1h12.com" icon={EnvelopeIcon}>
        nicolas@1h12.com
      </SocialLink>
    </div>
  )
}

export default ContactBox
