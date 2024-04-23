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
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const res = await signIn('credentials',{
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: "/home"
      })
      if(!res?.error && e.target.email.value.includes("@student.unpar.ac.id")){
        push("/home/"+session?.user?.role+"/"+session?.user?.email)
      } else if(!res?.error && e.target.email.value.includes("admin")){
        push("/homeAdmin")
      }
      else{
        //untuk buat handle salah masukin email/pass, buat modal dipanggil di sini
        // console.log(res.error);
        // console.log(res);
        // console.log(email.value);
        // console.log(password.value);
        alert("email/ password salah")
        setLoading(false)
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleLoginGoogle =async()=>{
    setLoading(true)
    const response = await signIn('google', {callbackUrl:`/home/+${session?.user?.role}+/+${session?.user?.email}`, redirect: false });
    // Lakukan sesuatu dengan response jika diperlukan
    if (response?.error) {
      // push("/home")
    } else {
      // Mendapatkan informasi yang relevan dari hasil autentikasi
      push("/home/"+session?.user?.role+"/"+session?.user?.email)
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full flex-1 justify-center text-center">
      <div className='bg-white rounded-2xl flex shadow-2xl w-full max-w-4xl'>
        <div className='w-3/6 lg:w-3/5 px-5  py-20'>
          <p className='text-3xl font-bold'>Sign in</p>
          <p className='mt-2'>Gunakan akun google unpar untuk masuk ke dalam perangkat lunak simulasi FRS</p>
          <div className='border-2 w-10 border-black inline-block mb-2'></div>
          <form action="" method="get" className='mt-8 space-y-6' onSubmit={(e) => handleLogin(e)}>
            <div className='flex flex-col items-center'>
              {/* <input className='input mb-2 p-3 bg-gray-100 rounded-xl w-full' type="email" name="email" id="email" placeholder="....@student.unpar.ac.id"  required/>
              <input className='input mb-10 p-3 bg-gray-100 rounded-xl w-full' type="password" name="password" id="password" placeholder="Password" required ></input>
              <button type='submit' className='btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-2xl px-5 py-2'>
                {(loading?(<span>Signing in...</span>):(<span>Sign in</span>))}
              </button> */}
              <button type='button' className='mt-5 btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-2xl px-5 py-2' onClick={()=>handleLoginGoogle()}>
                Masuk dengan Akun Google
              </button>
            </div>
          </form>
        </div> {/*sign in */}
        <div className='bg-sky-500 p-5 text-white w-3/6 lg:w-2/5 rounded-tr-2xl rounded-br-2xl'>
          <p className='lg:text-3xl font-bold mt-12 text-2xl'>Perangkat Lunak Simulasi FRS</p>
          <div className='border-2 w-10 border-white inline-block mb-2'></div>
          <p className='mb-2'>Rencanakan Studimu dengan Baik!</p>
          <img className=' rounded-3xl' src={bg.src}></img>
        </div> {/*sign up */}
      </div>
    </main>
  )
}
