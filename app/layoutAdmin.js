"use client"
import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import logodouble from '@/assets/logoifunpar3.png'


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Simulasi FRS',
//   description: 'Generated by create next app',
// }

export default function LayoutAdmin() {
  const {data:session, status} = useSession();
  const router = useRouter();
  // console.log(session);
  // console.log(status);
  useEffect(()=>{
    if(status === "unauthenticated" ){
      router.push('/')
    }
    else if(status==="authenticated" && session?.user?.role == "admin"){
      // console.log(session,status);
    }
    else if(status==="authenticated" && session?.user?.role != "admin"){
      signOut()
      router.push("/")
    }
  }, [status])
  return (
          <div className='w-screen text-left lg:space-x-5 p-5 bg-sky-600'>
            <img className='float-left w-24 h-13 rounded-xl scale-150 m-5' src={logodouble.src}></img>
            <a href='/homeAdmin' className='mt-1.5 btn bg-sky-600 border-none float-left text-xl  hover:bg-sky-700 text-white rounded-md px-3 '><h1>SIMULASI FRS</h1></a>
            <a href='/homeAdmin' className='mt-1.5 btn bg-sky-600 border-none float-left   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Jadwal Kuliah</h1></a>
            <a href='/jadwalUjian' className='mt-1.5 btn bg-sky-600 border-none float-left   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Jadwal Ujian</h1></a>
            {status === "authenticated" ? (
              <a href='/' onClick={()=>signOut()} className='mt-1.5 btn bg-sky-600 border-none lg:float-right float-left hover:bg-sky-700 text-white rounded-md px-3 py-2'>Sign Out</a>

            ) : (
              // <a href='/' onClick={()=>signIn()} className='mt-1.5 btn bg-sky-600 border-none lg:float-right float-left  hover:bg-sky-700 text-white rounded-md px-3 py-2'>Sign Out</a>
              <p>error: harusnya tidak keluar</p>
            )}
            <img className="float-right w-10 h-10 mt-3.5 rounded-full" src={session?.user?.image}></img>
            <p className='float-right text-white px-3 py-2 lg:mt-1.5 mt-4 text-sm lg:text-base '>{session?.user?.name}</p>

          </div>
  )
}
