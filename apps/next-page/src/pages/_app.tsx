import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone={'Asia/Shanghai'}
      messages={pageProps.messages}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
