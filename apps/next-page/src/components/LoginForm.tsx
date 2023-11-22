import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import { schema } from '@/libs/types'
import type { FormData } from '@/libs/types'

export default function LoginForm() {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    console.log(data)

    // Todo: submit data to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000))
    reset()
  }

  return (
    <>
      <form className={'flex flex-col gap-y-2 mt-4'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'mb-2 flex flex-row justify-between'}>
          <label htmlFor="username">{t('homepage.username')}</label>
          <input
            type="text"
            id="username"
            className={'border border-gray-100 rounded-lg'}
            {...register('username')}
          />
        </div>
        <p className={'text-red-600'}>
          {errors.username && <span>{String(errors.username.message)}</span>}
        </p>

        <div className={'mb-2 flex flex-row justify-between'}>
          <label htmlFor="password">{t('homepage.password')}</label>
          <input
            type="password"
            id="password"
            className={'border border-gray-100 rounded-lg'}
            {...register('password')}
          />
        </div>
        <p className={'text-red-600'}>
          {errors.password && <span>{String(errors.password.message)}</span>}
        </p>

        <div className={'mb-2 flex flex-row justify-between'}>
          <label htmlFor="confirmPassword">{t('homepage.confirmPassword')}</label>
          <input
            type="password"
            id="confirmPassword"
            className={'border border-gray-100 rounded-lg'}
            {...register('confirmPassword')}
          />
        </div>
        <p className={'text-red-600'}>
          {errors.confirmPassword && <span>{String(errors.confirmPassword.message)}</span>}
        </p>

        <div className={'mb-2 flex flex-row justify-between'}>
          <label htmlFor="email">{t('homepage.email')}</label>
          <input
            type="email"
            id="email"
            className={'border border-gray-100 rounded-lg'}
            {...register('email')}
          />
        </div>
        <p className={'text-red-600'}>
          {errors.email && <span>{String(errors.email.message)}</span>}
        </p>

        <button
          className={'mt-2 border rounded-lg disabled:bg-gray-500'}
          type={'submit'}
          disabled={isSubmitting}
        >
          {t('homepage.login')}
        </button>
      </form>
    </>
  )
}
