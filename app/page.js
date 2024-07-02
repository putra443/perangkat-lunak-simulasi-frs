"use client"
import Image from 'next/image'
import { setQuarter } from 'date-fns'
import {useSession, signIn, signOut} from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import bg from '@/assets/logoifunpar2.png'


export default function Home() {
  const {push} = useRouter()
  const {data:session, status} = useSession()
  const [loading, setLoading] = useState(false)
  

  const handleLoginGoogle =async()=>{
    setLoading(true)
    console.log(session?.user?.role);
    const response = await signIn('google', {callbackUrl:`/home`, redirect: false });
    // Lakukan sesuatu dengan response jika diperlukan
    if (response?.error) {
      // push("/")
    } else {
      // Mendapatkan informasi yang relevan dari hasil autentikasi
      push("/home")
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center mx-5 flex-1 justify-center text-center">
      <div className='bg-white rounded-2xl flex shadow-2xl w-full max-w-4xl'>
        <div className='w-3/6 lg:w-3/5 px-5  py-20'>
          <p className='text-3xl font-bold'>Sign in</p>
          <p className='mt-2'>Gunakan akun Google UNPAR untuk masuk ke dalam perangkat lunak simulasi FRS</p>
          <div className='border-2 w-10 border-black inline-block mb-2'></div>
          <form action="" method="get" className='mt-8 space-y-6' >
            <div className='flex flex-col items-center'>
              <button type='button' className='mt-5 btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-2xl p-3' onClick={()=>handleLoginGoogle()}>
                Masuk dengan Akun Google
              </button>
            </div>
          </form>
        </div> {/*sign in */}
        <div className='bg-sky-500 p-5 text-white w-3/6 lg:w-2/5 rounded-tr-2xl rounded-br-2xl'>
          <p className='lg:text-3xl font-bold mt-12 text-2xl'>Perangkat Lunak Simulasi FRS</p>
          <div className='border-2 w-10 border-white inline-block mb-2'></div>
          <p className='mb-2'>Rencanakan Studimu dengan Baik!</p>
          <Image className=' rounded-3xl' src={bg.src} alt='logoIfUnpar' width={350} height={350}/>
        </div> {/*sign up */}
      </div>
    </main>
  )
}
