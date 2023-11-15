import bg from '../../assets/background_unpar.jpg'
import LayoutUser from '../layoutUser'
import AddMataKuliah from './addMataKuliah';
import DeleteMataKuliah from './deleteMataKuliah'

async function getMataKuliah(){
    const res = await fetch('http://localhost:5001/mataKuliah',{cache:'no-store'});
    const result = await res.json()
    return result
}

export default async function Simulasi(){
    const mataKuliah = await getMataKuliah();
    // console.log(mataKuliah[0]);
    return(
        <main className="flex min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='flex flex-col px-20 w-screen h-screen bg-gradient-to-br from-teal-500'>
                <p className='text-4xl text-left m-4 text-white'>Simulasi FRS</p>
                <p className='text-xl text-left text-white bg-cyan-600 w-1/5 text-center p-3 rounded-2xl'>Jadwal Kuliah</p>
                <div className=' justify-start text-left m-5'>
                    {/* untuk add mata kuliah */}
                    <AddMataKuliah/>
                </div>


                <table className='table text-center mt-5 rounded-2xl bg-gray-200'>
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
                                <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.nama}</td>
                                <td className=" font-semibold" key={mataKuliah.id}>Senin</td>
                                <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.jamMulai}</td>
                                <td className=" font-semibold" key={mataKuliah.id}>{mataKuliah.jamSelesai}</td>
                                <td className='font-semibold' key={mataKuliah.id}>A</td>
                                <td className='font-semibold' key={mataKuliah.id}>Kuliah</td>
                                <td className=" font-semibold pt-3 pb-3" key={mataKuliah.id}>
                                    <DeleteMataKuliah{...mataKuliah} className="m-3"/>
                                    </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className='text-xl text-left text-white mt-5 bg-cyan-600 w-1/5 text-center p-3 rounded-2xl'>Jadwal Ujian</p>

            </div>
        </main>
    )
        
}