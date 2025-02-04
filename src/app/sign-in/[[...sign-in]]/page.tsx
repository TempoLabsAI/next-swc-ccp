import { SignIn } from '@clerk/nextjs'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Page() {
    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center min-h-screen w-full'>
                <SignIn />
            </div>
            <Footer />
        </>
    )
}