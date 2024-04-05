import LayoutAdmin from '../layoutAdmin'
import bg from '../../assets/background_unpar.jpg'
import UpdateUser from '../usersAdmin/updateUser'
import DeleteUser from '../usersAdmin/deleteMahasiswa'
import AddAdmin from './addAdmin'
import DeleteAdmin from './deleteAdmin'

async function getUsers(){
    const res = await fetch('http://localhost:3000/api/usersAdmin',{cache:'no-store'})
    const result = await res.json();
    return result
}

export default async function UsersAdmin(){
    
    const listUser = await getUsers()
    
    return(
        <div className="flex overflow-y-auto overflow-x-hidden min-h-screen max-h-content flex-col items-center px-20 text-center bg-auto bg-center" style={{backgroundImage: `url(${bg.src})`}}>
            <LayoutAdmin/>
            <div className='flex flex-col lg:px-20 px-5 w-screen min-h-screen max-h-content bg-gradient-to-br from-sky-500'>
                <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
                    <p className='text-4xl text-white text-center lg:text-left'>Selamat Datang di Perangkat Lunak Simulasi FRS</p>
                    <p className='text-l text-white bg-sky-600 rounded-2xl p-2 my-5 lg:w-1/6 text-center'> Tabel User</p>
                </div>
                <div className='float-left'>
                    <div className='flex flex-row space-x-5'>
                        <AddAdmin/>
                        <DeleteUser/>
                        <DeleteAdmin>{...listUser}</DeleteAdmin>
                    </div>
                </div>
                <div className='overflow-scroll no-scrollbar'>
                        <table className='mb-10 table text-center mt-5 rounded-2xl bg-gray-200'>
                        <thead>
                            <tr className='bg-sky-600 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>NPM</th>
                                <th className='p-5'>Nama Lengkap</th>
                                <th className='p-5'>Email</th>
                                <th className='p-5'>Role</th>
                                <th className='p-5'>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listUser.map((user, index)=>(
                            <tr  key={user.idUser}>
                                <td className=" font-semibold">{index+1}</td>
                                <td className=" font-semibold" >{user.email.includes("618") ? (user.email.substring(0,10)):("ADMIN")}</td>
                                <td className=" font-semibold" >{user.fullname=="" ? ("To be Updated") : (user.fullname)}</td>
                                <td className=" font-semibold" >{user.email}</td>
                                <td className=" font-semibold" >{user.role}</td>
                                <td className=" font-semibold" >
                                    <UpdateUser>{user}</UpdateUser>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                    </div>            
            </div>
        </div>
    )
    
}