import ThemeChanger from '@/components/ThemeChanger'

export default function Home() {

  return (
    <div
      className={`
        flex flex-col justify-center items-center min-h-screen 
        dark:bg-black dark:text-white
      `}
    >
      <p>App Router - Hello World</p>

      <div className={'mt-4'}>
        <ThemeChanger/>
      </div>
    </div>
  )
}
