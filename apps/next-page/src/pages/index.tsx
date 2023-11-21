import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useTheme } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {theme, setTheme} = useTheme()

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
        <p>Pages Router - Hello World</p>

        <div className={'mt-4'}>
          <button
            className={`
            p-2 bg-gray-50 rounded-lg shadow text-black 
            focus:ring-1 focus:ring-black focus:ring-opacity-7 hover:bg-gray-100
          `}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Theme
          </button>
        </div>
      </div>
    </>

  )
}
