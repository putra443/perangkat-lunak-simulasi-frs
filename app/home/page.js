import bg from '../../assets/background_unpar.jpg'
import LayoutUser from "../layoutUser"
export default function Home() {
    return (
      <div className="flex min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
        <LayoutUser/>
        <div className='flex flex-col px-20 w-screen h-screen bg-gradient-to-br from-teal-500'>
          <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
            <p className='text-4xl text-white'>Selamat Datang di Perangkat Lunak Simulasi FRS</p>
            <p className='text-l text-white'> Rencanakan Studimu untuk semester selanjutnya dengan baik!</p>
          </div>
          <div className='flex text-xl mt-2 p-5 space-x-10'>
            <a href="/daftarNilai" className='px-4 py-2 rounded-3xl bg-teal-800 text-white hover:bg-teal-700'>Lihat Nilai</a>
            <a href="/simulasi" className='px-4 py-2 rounded-3xl bg-teal-800 text-white hover:bg-teal-700'>Simulasi FRS</a>
          </div>
        </div>
        
      </div>
    )
  }