import {FC, PropsWithChildren, useMemo} from 'react'

import Link, {LinkProps} from 'next/link'

import Container from '@/components/Container'
import {NAVLINKS} from '@/utils'

const NavLink: FC<LinkProps & PropsWithChildren> = ({href, children}) => {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

const Footer: FC = () => {
  const renderList = useMemo(
    () =>
      NAVLINKS.map((link, index) => {
        return (
          <NavLink key={`footer-nav-${index}`} href={link.href}>
            {link.name}
          </NavLink>
        )
      }),
    []
  )

  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {renderList}
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}

export default Footer
