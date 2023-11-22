import { z } from 'zod'

export type FormData = {
  username: string
  password: string
  confirmPassword: string
  email: string
}

export const schema = z.object({
  username: z.string().min(2, 'password must be at least 2 characters').max(20).regex(/^[a-zA-Z0-9]+$/),
  password: z.string().min(4, 'password must be at least 4 characters').max(20),
  confirmPassword: z.string().min(4, 'password must be at least 4 characters').max(20),
  email: z.string().email(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'passwords do not match',
  path: ['confirmPassword'],
})
