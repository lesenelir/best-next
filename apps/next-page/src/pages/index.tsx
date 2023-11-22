import Head from 'next/head'
import { z } from 'zod'
import { Inter } from 'next/font/google'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { GetStaticPropsContext } from 'next'

const inter = Inter({ subsets: ['latin'] })

type FormData = {
  username: string
  password: string
  email: string
}

const schema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
  password: z.string().min(4).max(20),
  email: z.string().email(),
})

export default function Home() {
  const t = useTranslations()
  const router = useRouter()
  const {theme, setTheme} = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

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

        <form className={'flex flex-col mt-4'} onSubmit={handleSubmit(onSubmit)}>
          <div className={'mb-2 flex flex-row justify-between'}>
            <label htmlFor="username">{t('homepage.username')}</label>
            <input
              type="text"
              id="username"
              className={'border border-gray-100 rounded-lg'}
              {...register('username', {required: true})}
            />
            {/*<p>*/}
            {/*  {errors.username && <span>{String(errors.username.message)}</span>}*/}
            {/*</p>*/}
          </div>

          <div className={'mb-2 flex flex-row justify-between'}>
            <label htmlFor="password">{t('homepage.password')}</label>
            <input
              type="password"
              id="password"
              className={'border border-gray-100 rounded-lg'}
              {...register('password', {required: true})}
            />
            {/*<p>*/}
            {/*  {errors.password && <span>{String(errors.password.message)}</span>}*/}
            {/*</p>*/}
          </div>

          <div className={'mb-2 flex flex-row justify-between'}>
            <label htmlFor="email">{t('homepage.email')}</label>
            <input
              type="email"
              id="email"
              className={'border border-gray-100 rounded-lg'}
              {...register('email', {required: true})}
            />
            {/*<p>*/}
            {/*  {errors.email && <span>{String(errors.email.message)}</span>}*/}
            {/*</p>*/}
          </div>

          <button className={'mt-2 border rounded-lg'} type={'submit'}>
            {t('homepage.login')}
          </button>
        </form>

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
