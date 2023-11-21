'use client'

import { useTheme } from 'next-themes'

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button
        className={`
          w-28 p-2 bg-gray-50 rounded-lg shadow text-black 
          focus:ring-1 focus:ring-black focus:ring-opacity-7 hover:bg-gray-100
        `}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Theme
      </button>
    </>
  )
}
