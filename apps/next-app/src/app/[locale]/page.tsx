import { useTranslations } from 'next-intl'

import I18nChanger from '@/components/I18nChanger'
import ThemeChanger from '@/components/ThemeChanger'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  const t = useTranslations()

  return (
    <div
      className={`
        flex flex-col justify-center items-center min-h-screen 
        dark:bg-black dark:text-white
      `}
    >
      <p>{t('homepage.title')}</p>

      <LoginForm
        username={t('homepage.username')}
        password={t('homepage.password')}
        email={t('homepage.email')}
        login={t('homepage.login')}
      />

      <div className={'mt-4 flex flex-row gap-4'}>
        <ThemeChanger/>
        <I18nChanger/>
      </div>
    </div>
  )
}
