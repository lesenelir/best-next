import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import type { GetStaticPropsContext } from 'next'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {theme, setTheme} = useTheme()
  const router = useRouter()
  const t = useTranslations()

  return (
    <>
      <Head>
        <title>Create Next Page</title>
        <meta name='description' content='Create Next Page'/>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div
        className={`
        flex flex-col justify-center items-center min-h-screen 
        dark:bg-black dark:text-white ${inter.className}
      `}
      >
        <p>{t('homepage.title')}</p>

        <div className={'mt-4 flex flex-row gap-4'}>
          <button
            className={`
            w-28 p-2 bg-gray-50 rounded-lg shadow text-black 
            focus:ring-1 focus:ring-black focus:ring-opacity-7 hover:bg-gray-100
          `}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Theme
          </button>
          <button
            className={`
            w-28 p-2 bg-gray-50 rounded-lg shadow text-black 
            focus:ring-1 focus:ring-black focus:ring-opacity-7 hover:bg-gray-100
          `}
            onClick={() => router.push(router.pathname, router.asPath,{locale: router.locale === 'en' ? 'zh' : 'en'})}
          >
            International
          </button>
        </div>
      </div>
    </>

  )
}

export async function getStaticProps(context: GetStaticPropsContext) {

  return {
    props: {
      messages: (await import(`../../locales/${context.locale}.json`)).default
    }
  }
}
