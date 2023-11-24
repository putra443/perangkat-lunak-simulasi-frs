import bg from '../../assets/background_unpar.jpg'
import LayoutUser from '../layoutUser'
import AddMataKuliah from './addMataKuliah';
import DeleteMataKuliah from './deleteMataKuliah'
import CekBentrok from './cekBentrok'

async function getJadwalMataKuliah(){
    const res = await fetch('http://localhost:3000/api/simulasi/',{cache:'no-store'});
    const result = await res.json()
    return result
}

// async function getJadwalMaster(){
//     const res = await fetch('http://localhost:3000/api/simulasi/',{cache:'no-store'});
//     const result = await res.json()
//     return result
// }

export default async function Simulasi(){
    const mataKuliah = await getJadwalMataKuliah();
    // const dataMaster = await getJadwalMaster()
    // console.log(mataKuliah);
    return(
        <main className="flex overflow-y-scroll overflow-x-hidden min-h-screen w-screen overflow-x-hidden overflow-y-auto flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='flex flex-col px-20 w-screen h-max bg-gradient-to-br from-teal-500'>
                <p className='text-4xl text-left m-4 text-white'>Simulasi FRS</p>
                <div className=' justify-start text-left m-5'>
                    {/* untuk add mata kuliah */}
                    <AddMataKuliah>{...mataKuliah}</AddMataKuliah>
                </div>
                <p className='text-xl text-left text-white bg-cyan-600 w-1/5 text-center p-3 rounded-2xl'>Jadwal Kuliah</p>

                <div className='overflow-scroll no-scrollbar rounded-xl'>
                    <table className=' table text-center mt-5 rounded-2xl bg-gray-200'>
                        <thead>
                            <tr className='bg-cyan-600 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>Nama Mata Kuliah</th>
                                <th className='p-5'>Hari</th>
                                <th className='p-5'>Jam Mulai</th>
                                <th className='p-5'>Jam Selesai</th>
                                <th className='p-5'>Kelas</th>
                                <th className='p-5'>Sesi</th>
                                <th className='p-5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mataKuliah.map((mataKuliah, index)=>(
                                <tr  key={mataKuliah.id}>
                                    <td className=" font-semibold">{index+1}</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.namaMataKuliah}</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>Senin</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.jam_mulai}</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.jam_selesai}</td>
                                    <td className='font-semibold' key={mataKuliah.id}>{mataKuliah.kelas}</td>
                                    <td className='font-semibold' key={mataKuliah.id}>{mataKuliah.sesi}</td>
                                    <td className=" font-semibold pt-3 pb-3" key={mataKuliah.id}>
                                        <DeleteMataKuliah key={mataKuliah.id}{...mataKuliah} className="m-3"/>
                                        </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                

                <p className='text-xl text-left text-white mt-5 bg-cyan-600 w-1/5 text-center p-3 rounded-2xl'>Jadwal Ujian</p>
                <div className='overflow-scroll no-scrollbar rounded-xl'>
                    <table className='table text-center mt-5 rounded-2xl bg-gray-200'>
                        <thead>
                            <tr className='bg-cyan-600 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>Nama Mata Kuliah</th>
                                <th className='p-5'>Tanggal UTS</th>
                                <th className='p-5'>Waktu Mulai UTS</th>
                                <th className='p-5'>Waktu Selesai UTS</th>
                                <th className='p-5'>Tanggal UAS</th>
                                <th className='p-5'>Waktu Mulai UAS</th>
                                <th className='p-5'>Waktu Selesai UAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mataKuliah.map((mataKuliah, index)=>(
                                <tr  key={mataKuliah.id}>
                                    <td className=" font-semibold">{index+1}</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.namaMataKuliah}</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>31/10/2023</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.jamMulai}</td>
                                    <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.jamSelesai}</td>
                                    <td className='font-semibold' key={mataKuliah.id}>09/01/2024</td>
                                    <td className='font-semibold' key={mataKuliah.id}>{mataKuliah.jamMulai}</td>
                                    <td className=" font-semibold pt-3 pb-3" key={mataKuliah.id}>{mataKuliah.jamSelesai}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>                 
                </div>
                
                <div className='mb-10 justify-start text-left'>
                    <CekBentrok/>       
                </div>
            </div>
        </main>
    )
        
}