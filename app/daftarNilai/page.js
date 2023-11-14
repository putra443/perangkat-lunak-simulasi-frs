import bg from '../../assets/background_unpar.jpg'
import LayoutUser from '../layoutUser'


async function getNilaiMataKuliah(){
    const res = await fetch('http://localhost:5001/nilaiMataKuliah',{cache:'no-store'});
    const result = await res.json()
    return result
}

export default async function DaftarNilai(){
    const nilai = await getNilaiMataKuliah();
    console.log(nilai.nama);
    return(
        <main className="flex min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
            <LayoutUser/>
            <div className='flex flex-col px-20 w-screen h-screen bg-gradient-to-br from-teal-500'>
                <p className='text-4xl text-left m-4 text-white'>Daftar Nilai</p>

                <table className='mt-5 rounded-2xl bg-gray-200'>
                    <thead>
                        <tr className='bg-cyan-600 text-white'>
                            <th className='p-5'>No</th>
                            <th className='p-5'>Nama Mata Kuliah</th>
                            <th className='p-5'>Nilai Akhir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nilai.map((nilai, index)=>(
                            <tr key={nilai.id}>
                                <td className='semi-bold p-3 ' key={nilai.id}>{index+1}</td>
                                <td className='semi-bold p-3 ' key={nilai.id}>{nilai.nama}</td>
                                <td className='semi-bold p-3 ' key={nilai.id}>{nilai.nilaiAkhir}</td>
                            </tr>
                        ))}
                        
                        <tr className='border-y-1 border-black'>
                            <td></td>
                            <td className=' col-span-3 font-semibold'>Total SKS Lulus</td>
                            <td className='font-semibold'>128</td>
                        </tr>
                        <tr className='border-y-1 border-black'>
                            <td></td>
                            <td className='p-5  col-span-3 font-semibold'>Index Prestasi Kumulatif (IPK)</td>
                            <td className='p-5 font-semibold'>2.81</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <a href='#' className='float-right text-white text-center rounded-2xl w-1/5 px-4 py-2 mt-3 text-lg bg-green-700'>Edit Nilai</a>
                </div>
            </div>
            
        </main>
    )
}