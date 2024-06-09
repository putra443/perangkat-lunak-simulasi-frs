import LayoutAdmin from '../layoutAdmin'
import bg from '../../assets/background_unpar.jpg'
import DeleteUser from './components/deleteMahasiswa'
import AddAdmin from './components/addAdmin'
import DeleteAdmin from './components/deleteAdmin'
import DeleteMahasiswa from './components/deleteMahasiswaSingle'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getUsers(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usersAdmin`,{cache:'no-store'})
    const result = await res.json();
    return result
}

export default async function UsersAdmin(){
    
    const listUser = await getUsers()
    
    return(
        <div className="flex overflow-y-auto overflow-x-hidden min-h-screen max-h-content flex-col items-center px-20 text-center bg-auto bg-center" style={{backgroundImage: `url(${bg.src})`}}>
            <LayoutAdmin/>
            <div className='flex flex-col lg:px-20 px-5 w-screen min-h-screen max-h-content bg-gradient-to-br from-sky-500'>
                <div className="flex flex-col text-left mt-10 text-xl" >
                    <p className='text-4xl text-white text-center lg:text-left'>Selamat Datang di Perangkat Lunak Simulasi FRS</p>
                    <p className='text-l text-white bg-sky-600 rounded-2xl p-2 my-5 lg:w-1/6 text-center'> Tabel User</p>
                </div>
                <div className='float-left'>
                    <div className='flex flex-row space-x-5 overflow-scroll no-scrollbar'>
                        <AddAdmin/>
                        <DeleteUser/>
                        <DeleteAdmin>{...listUser}</DeleteAdmin>
                        <DeleteMahasiswa>{...listUser}</DeleteMahasiswa>
                    </div>
                </div>
                <div className='overflow-scroll no-scrollbar'>
                        <table className='mb-10 table text-center mt-5  bg-gray-200'>
                        <thead>
                            <tr className='bg-sky-600 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>NPM</th>
                                <th className='p-5'>Nama Lengkap</th>
                                <th className='p-5'>Email</th>
                                <th className='p-5'>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listUser[0]!=null ? (
                        listUser.map((user, index)=>(
                            <tr  key={user.idUser} className='hover:text-indigo-700 transition-all'>
                                <td className=" font-semibold py-5">{index+1}</td>
                                <td className=" font-semibold" >{user.email.includes("618") ? (user.email.substring(0,10)):("ADMIN")}</td>
                                <td className=" font-semibold" >{user.fullname=="" ? ("To be Updated") : (user.fullname)}</td>
                                <td className=" font-semibold" >{user.email}</td>
                                <td className=" font-semibold" >{user.role}</td>
                            </tr>
                        ))):
                        (<tr className='hover:text-indigo-700 transition-all font-semibold text-l'><td colSpan={5} className=' text-center'>Belum ada pengguna</td></tr>)
                        }
                        </tbody>
                        </table>
                    </div>            
            </div>
        </div>
    )
    
}