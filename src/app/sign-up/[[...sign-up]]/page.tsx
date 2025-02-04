import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <SignUp />
    </div>
  )
}