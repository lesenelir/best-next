'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function I18nChanger() {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = () => {
    const currentLang = pathname.startsWith('/zh') ? 'zh' : 'en'
    const newLang = currentLang === 'en' ? 'zh' : 'en';

    // BUG
    const newPathname = pathname.replace(/^\/(en|zh)/, `/${newLang}`)
    router.push(newPathname)
  }

  return (
    <>
      <button
        className={`
          w-28 p-2 bg-gray-50 rounded-lg shadow text-black 
          focus:ring-1 focus:ring-black focus:ring-opacity-7 hover:bg-gray-100
        `}
        onClick={changeLanguage}
      >
        International
      </button>
    </>
  )
}
