"use client"
import { useEffect} from 'react'
import bg from '@/assets/background_unpar.jpg'
import LayoutUser from "../../layoutUser"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function Home({params}) {
  const {data:session, status} = useSession();
  // console.log(session);
    return (
      <div className="flex min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
        <LayoutUser/>
        <div className='flex flex-col px-20 w-screen h-screen bg-gradient-to-br from-sky-500'>
          <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
            <p className='text-4xl text-white'>Selamat Datang di Perangkat Lunak Simulasi FRS</p>
            <p className='text-l text-white'> Rencanakan Studimu untuk semester selanjutnya dengan baik!</p>
          </div>
          <div className='flex text-xl mt-2 p-5 space-x-10'>
            {session?.user?.role=="Admin / Mahasiswa" ? (<a href={`/simulasi/${session?.user?.role.substring(8,session?.user?.role.length)}/${session?.user?.email}/${session?.user?.id}`}    className='btn border-none hover:bg-sky-900 text-lg px-4 py-2 rounded-3xl bg-sky-800 text-white hover:bg-sky-700'>Simulasi FRS</a>) 
            : 
            (<a href={`/simulasi/${session?.user?.role}/${session?.user?.email}/${session?.user?.id}`}    className='btn border-none hover:bg-sky-900 text-lg px-4 py-2 rounded-3xl bg-sky-800 text-white hover:bg-sky-700'>Simulasi FRS</a>)}
            
          </div>
        </div>
        
      </div>
    )
  }