"use client"
import bg from '@/assets/background_unpar.jpg'
import LayoutUser from "../../layoutUser"
import TabelSemester from '../tabelSemester'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

async function getDaftarMataKuliah(params){
    const res = await fetch(`http://localhost:3000/api/daftarMataKuliah/${params}`,{cache:'no-store'})
    const result = await res.json()
    return result;
}

let idMatakuliahTerambil =[]



export default async function daftarMataKuliah(params){
    const router = useRouter()
    const daftarMataKuliah = await getDaftarMataKuliah(params)
    // console.log(daftarMataKuliah);
    // console.log(params.params.user);
    // const [isMutating, setIsMutating] =useState(false)
    function handleSubmit(idMatakuliahTerambil){
        for (let index = 0; index < idMatakuliahTerambil.length; index++) {
            const element = idMatakuliahTerambil[index];
            upload(element)
        }
        router.replace(`http://localhost:3000/simulasi/${params.params.user[0]}/${params.params.user[1]}/${params.params.user[2]}`)
    }
    

    async function upload(id){
        await fetch(`http://localhost:3000/api/daftarMataKuliah/${params.params.user[2]}`,{
        method:"POST",
        body: JSON.stringify({
            idJadwalMataKuliah:id
        })
    })
        
    }
    return(
        <main className="flex min-h-screen w-screen overflow-x-hidden overflow-y-auto flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='pb-10 flex flex-col lg:px-20 px-5 w-screen max-h-content  bg-gradient-to-br from-sky-500'>
                <p className='text-4xl text-left m-4 text-white'>Simulasi FRS</p>
                <p className='text-xl text-left text-white bg-sky-700 text-white lg:w-1/5 text-center p-3 rounded-2xl'>Jadwal Kuliah</p>
                <div className=' overflow-auto rounded-xl'>
                    <form>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2 text-center'>Semester 1</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil}  sem={1}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 2</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={2}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 3</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={3}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 4</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={4}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 5</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={5}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 6</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={6}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 7</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={7}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 8</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={8}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Mata Kuliah Pilihan</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah} arrayId={idMatakuliahTerambil} sem={0}/>
                        <button onClick={()=>handleSubmit(idMatakuliahTerambil)} className=" float-left mt-5 btn bg-sky-700 text-white border-none" type="button">Save</button>
                    </form>  
                </div>
            </div>
        </main>
    )
}