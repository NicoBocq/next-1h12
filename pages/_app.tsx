import {useEffect, useRef} from 'react'

import '@/styles/globals.css'
import type {AppProps} from 'next/app'

import 'focus-visible'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const usePrevious = (value: string) => {
  const ref = useRef<string>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const App = ({Component, pageProps, router}: AppProps): JSX.Element => {
  const previousPathname = usePrevious(router.pathname)
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
