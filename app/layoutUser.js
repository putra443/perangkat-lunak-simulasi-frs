"use client"
import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import logodouble from '@/assets/logoifunpar3.png'
import Image from 'next/image';


export default function LayoutUser() {
  const {data:session, status} = useSession();
  const router = useRouter();
  // console.log(session);
  // console.log(status);
  useEffect(()=>{
    if(status === "unauthenticated"){
      router.push('/')
    }
    else if(status==="authenticated" && session?.user?.role == "Mahasiswa" || status==="authenticated" && session?.user?.role == "Admin / Mahasiswa" ){
      // console.log(session,status);
      // router.push(`/home/${session?.user?.role}/${session?.user?.email}`)
    }
    else if(status==="authenticated" && session?.user?.role == "Admin"){
      router.push("/homeAdmin")
    }
    else if(status==="authenticated" && session?.user?.role != "Mahasiswa"){
      signOut()
      router.push("/")
    }
  })
  return (
          <div className=' w-screen text-left lg:space-x-5 p-5 bg-sky-600'>
            <Image src={logodouble.src} className='float-left w-28 h-13 rounded-xl scale-150 m-5 lg:mr-5 mr-10' priority sizes='(max-width: 24px)' width={24} height={13} alt="Logo"/>
            <a href={`/home`} className='mt-3.5 btn bg-sky-600 border-none float-left text-xl hover:bg-sky-700 text-white rounded-md px-3 '><h1>SIMULASI FRS</h1></a>
            {session?.user?.role=="Admin / Mahasiswa" ? 
            ( <> 
                <a href={`/homeAdmin`} className='mt-3.5 btn bg-sky-600 border-none float-left   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Jadwal Kuliah</h1></a>
                <a href={`/jadwalUjian`} className='mt-3.5 btn bg-sky-600 border-none float-left   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Jadwal Ujian</h1></a>
                <a href={`/usersAdmin`} className='mt-3.5 btn bg-sky-600 border-none float-left   hover:bg-sky-700 text-white rounded-md px-3 '><h1>Pengguna</h1></a>
                {/* <a href={`/simulasi/${session?.user?.role.substring(8,session?.user?.role.length)}/${session?.user?.email}/${session?.user?.id}`} className='btn bg-sky-600 border-none hover:bg-sky-700 text-white rounded-md px-3 py-2 mt-1.5'>Simulasi</a> */}
              </>
              ):
            (null
            // <a href={`/simulasi/${session?.user?.role}/${session?.user?.email}/${session?.user?.id}`} className='btn bg-sky-600 border-none hover:bg-sky-700 text-white rounded-md px-3 py-2 mt-1.5'>Simulasi</a>
            )}
            {status === "authenticated" ? (
              <a onClick={()=>signOut('google')} className='mt-3.5 btn bg-sky-600 border-none lg:float-right float-left hover:bg-sky-700 text-white rounded-md px-3 py-2'>Keluar</a>

            ) : (
              <span></span>
            )}
            {/* <a href='/' className='btn bg-sky-600 border-none float-right hover:bg-sky-700 text-white rounded-md px-3 py-2'>Sign Out</a> */}
            {session?.user?.image && (<Image className="float-right w-10 h-10 mt-5 rounded-full" priority sizes='(max-width: 10px)' src={session.user.image} width={10} height={10} alt='ProfilePic'/>)}
            <p className=' text-xs lg:text-base mt-4 lg:mt-3.5 lg:float-right float-right text-white px-3 py-2'>{session?.user?.name}</p>
          </div>
  )
}
