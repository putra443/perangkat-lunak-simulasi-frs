import bg from '../../assets/background_unpar.jpg'
import LayoutUser from '../layoutUser'

export default function DaftarNilai(){
    return(
        <main className="flex min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
            <LayoutUser/>
            <div className='flex flex-col px-20 w-screen h-screen bg-gradient-to-br from-teal-500'>
                <h1>DAFTAR NILAI</h1>
            </div>
            
        </main>
    )
}