import bg from '../../assets/background_unpar.jpg'
import LayoutUser from '../layoutUser'

async function getMataKuliah(){
    const res = await fetch('http://localhost:5001/mataKuliah',{cache:'no-store'});
    const result = await res.json()
    return result
}

export default async function Simulasi(){
    const mataKuliah = await getMataKuliah();
    console.log(mataKuliah);
    return(
        <main className="flex min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='flex flex-col px-20 w-screen h-screen bg-gradient-to-br from-teal-500'>
                <p className='text-4xl text-left m-4 text-white'>Simulasi FRS</p>
                
                <div>
                    {/* untuk add mata kuliah */}
                </div>
                <table className='mt-5 rounded-2xl bg-gray-200'>
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
                                <td className=" font-semibold" key={mataKuliah.id}>
                                    <button type='submit' className='m-5 text-white rounded-2xl px-4 py-2 bg-red-500 hover:bg-red-700'>Delete</button>
                                    </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
        
}