import Image from 'next/image'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full flex-1 justify-center px-20 text-center">
      <div className='bg-white rounded-2xl flex shadow-2xl w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5 '>Sign in section</div> {/*sign in */}
        <div className='bg-teal-500 p-5  w-2/5'>Sign up section</div> {/*sign up */}
      </div>
      

    </main>
  )
}
