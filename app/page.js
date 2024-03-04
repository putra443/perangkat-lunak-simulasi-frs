"use client"
import Image from 'next/image'
import { setQuarter } from 'date-fns'
import {useSession, signIn, signOut} from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Home() {
  const {push} = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const res = await signIn('credentials',{
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: "/home"
      })
      if(!res?.error && e.target.email.value.includes("@student.unpar.ac.id")){
        push("/home")     
      } else if(!res?.error && e.target.email.value.includes("admin")){
        push("/homeAdmin")
      } else{
        //untuk buat handle salah masukin email/pass, buat modal dipanggil di sini
        console.log(res.error);
        console.log(res);
        console.log(email.value);
        console.log(password.value);
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center w-full flex-1 justify-center px-20 text-center">
      <div className='bg-white rounded-2xl flex shadow-2xl w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5'>
          <p className='text-3xl font-bold'>Sign in to Account</p>
          <p className='mt-2'>Gunakan akun google unpar untuk masuk</p>
          <div className='border-2 w-10 border-black inline-block mb-2'></div>
          <form action="" method="get" className='mt-8 space-y-6' onSubmit={(e) => handleLogin(e)}>
            <div className='flex flex-col items-center'>
              <input className='input mb-2 p-3 bg-gray-100 rounded-xl w-full' type="email" name="email" id="email" placeholder="....@student.unpar.ac.id"  required/>
              <input className='input mb-10 p-3 bg-gray-100 rounded-xl w-full' type="password" name="password" id="password" placeholder="Password" required />
              {/* <input type='submit' value='Sign In' className='btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-5 py-2'></input>
              <input type='submit' value='Sign In as Admin' className='btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-5 py-2 mt-5'></input> */}
              {/* <a  href='http://localhost:3000/home' className='btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-5 py-2'>Sign In</a>
              <a  href='http://localhost:3000/homeAdmin' className='btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-5 py-2 mt-5'>Sign in as Admin</a> */}
              <button type='submit' className='btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-5 py-2'>Sign In</button>
            </div>
          </form>
        </div> {/*sign in */}
        <div className='bg-teal-500 p-5 text-white w-2/5 rounded-tr-2xl rounded-br-2xl'>
          <p className='text-3xl font-bold mt-10'>Perangkat Lunak Simulasi FRS</p>
          <div className='border-2 w-10 border-white inline-block mb-2'></div>
          <p className='mb-2'>Rencanakan Studimu dengan Baik!</p>

        </div> {/*sign up */}
      </div>
      

    </main>
  )
}
