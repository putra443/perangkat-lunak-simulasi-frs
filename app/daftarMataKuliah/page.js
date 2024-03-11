"use client"
import bg from '../../assets/background_unpar.jpg'
import LayoutUser from "../layoutUser"
import TabelSemester from './tabelSemester'

async function getDaftarMataKuliah(){
    const res = await fetch('http://localhost:3000/api/daftarMataKuliah',{cache:'no-store'})
    const result = await res.json()
    return result;
}


export default  async function daftarMataKuliah(){
    const daftarMataKuliah = await getDaftarMataKuliah()
    // console.log(daftarMataKuliah);

    return(
        <main className="flex overflow-y-scroll overflow-x-hidden min-h-screen w-screen overflow-x-hidden overflow-y-auto flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='pb-10 flex flex-col px-20 w-screen max-h-content  bg-gradient-to-br from-sky-500'>
                <p className='text-4xl text-left m-4 text-white'>Simulasi FRS</p>
                <p className='text-xl text-left text-white bg-sky-700 text-white w-1/5 text-center p-3 rounded-2xl'>Jadwal Kuliah</p>
                <div className=' no-scrollbar rounded-xl'>
                    <form>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2 text-center'>Semester 1</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={1}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 2</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={2}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 3</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={3}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 4</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={4}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 5</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={5}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 6</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={6}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 7</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={7}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Semester 8</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={8}/>
                        <h1 className='bg-sky-700 text-white text-xl rounded-2xl float-left px-10 py-5 mt-2 mb-2'>Mata Kuliah Pilihan</h1>
                        <TabelSemester daftarMataKuliah={daftarMataKuliah}  sem={0}/>
                        <button className=" float-left mt-5 btn bg-sky-700 text-white border-none" type="button">Add...</button>
                    </form>  
                </div>
            </div>
        </main>
    )
}