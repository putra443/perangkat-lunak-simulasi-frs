"use client"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import logodouble from '@/assets/logoifunpar3.png'
import Image from 'next/image';




export default function LayoutAdmin() {
  const {data:session, status} = useSession();
  const router = useRouter();
  useEffect(()=>{
    if(status === "unauthenticated" ){
      router.push('/')
    }
    else if(status==="authenticated" && session?.user?.role == "Admin" || status==="authenticated" && session?.user?.role == "Admin / Mahasiswa" ){
    }
    else if(status==="authenticated" && session?.user?.role != "Admin"){
      signOut()
      router.push("/")
    }
  })
  return (
          <div className='w-screen text-left lg:space-x-5 p-5 bg-sky-600'>
            <Image src={logodouble.src} className='float-left w-28 h-13 rounded-xl scale-150 m-5 lg:ml-10 lg:mr-5 mr-10 lg:mb-5 mb-2' priority sizes='(max-width: 30px)' width={27} height={15} alt="Logo"/>
            {session?.user?.role=="Admin / Mahasiswa" ? (<a href={`/home/${session?.user?.role.substring(8,session?.user?.role.length)}/${session?.user?.email}`} className='mt-3.5 btn bg-sky-600 border-none float-left text-xl  hover:bg-sky-700 text-white rounded-md px-3 '><h1>SIMULASI FRS</h1></a>)
            :(<a href='/homeAdmin' className='mt-3.5 btn bg-sky-600 border-none float-left text-xl  hover:bg-sky-700 text-white rounded-md px-3 '><h1>SIMULASI FRS</h1></a>)}
            <a href='/homeAdmin' className='mt-3.5 btn bg-sky-600 border-none lg:float-left float-right  hover:bg-sky-700 text-white rounded-md px-3 '><h1>Jadwal Kuliah</h1></a>
            <a href='/jadwalUjian' className='mt-3.5 btn bg-sky-600 border-none lg:float-left float-right   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Jadwal Ujian</h1></a>
            <a href='/usersAdmin' className='mt-3.5 btn bg-sky-600 border-none lg:float-left float-right   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Pengguna</h1></a>
            {session?.user?.role=="Admin / Mahasiswa" ? 
            (<a href={`/simulasi/${session?.user?.role.substring(8,session?.user?.role.length)}/${session?.user?.email}/${session?.user?.id}`} className='mt-3.5 btn bg-sky-600 border-none float-left   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Simulasi</h1></a>):
            (<span></span>)}
            {status === "authenticated" ? (
              <a href='/' onClick={()=>signOut('google')} className='mt-3.5 btn bg-sky-600 border-none lg:float-right float-left hover:bg-sky-700 text-white rounded-md px-3 py-2'>Keluar</a>

            ) : (
              <span></span>
            )}
            {session?.user?.image && (<Image className="float-right w-10 h-10 mt-5 rounded-full" priority sizes='(max-width: 10px)' src={session.user.image} width={10} height={10} alt='ProfilePic'/>)}
            <p className='float-right text-white px-3 py-2 lg:mt-3.5 mt-4 text-sm lg:text-base '>{session?.user?.name}</p>

          </div>
  )
}
