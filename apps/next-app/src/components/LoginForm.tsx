'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type FormData = {
  username: string
  password: string
  email: string
}

interface IProps {
  username: string
  password: string
  email: string
  login: string
}

const schema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
  password: z.string().min(4).max(20),
  email: z.string().email(),
})

export default function LoginForm(props: IProps) {
  const { username, password, email, login } = props
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmitter = (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <form className={'flex flex-col mt-4'} onSubmit={handleSubmit(onSubmitter)}>
        <div className={'mb-2 flex flex-row justify-between'}>
          <label htmlFor="username">{username}</label>
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
          <label htmlFor="password">{password}</label>
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
          <label htmlFor="email">{email}</label>
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
          {login}
        </button>
      </form>
    </>
  )
}
