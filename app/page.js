import Image from 'next/image'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full flex-1 justify-center px-20 text-center">
      <div className='bg-white rounded-2xl flex shadow-2xl w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5'>
          <p className='text-3xl font-bold'>Sign in to Account</p>
          <p className='mt-2'>Gunakan akun google unpar untuk masuk</p>
          <div className='border-2 w-10 border-black inline-block mb-2'></div>
          <form action="" method="get" className='mt-8 space-y-6'>
            <div className='flex flex-col items-center'>
              <input className='mb-2 p-3 bg-gray-100 rounded-xl' type="email" name="email" id="email" placeholder="....@student.unpar.ac.id" required />
              <input className='mb-10 p-3 bg-gray-100 rounded-xl' type="password" name="password" id="password" placeholder="Password" required />
              <input type='submit' value='Submit' className='bg-teal-500 rounded-2xl px-5 py-2'></input>
            </div>
          </form>
        </div> {/*sign in */}
        <div className='bg-teal-500 p-5 text-white w-2/5 rounded-tr-2xl rounded-br-2xl'>
          <p className='text-3xl font-bold mt-10'>Perangkat Lunak Simulasi FRS</p>
          <div className='border-2 w-10 border-white inline-block mb-2'></div>
          <p className='mb-2'>Rencanakan Studimu dengan Baik!</p>

        </div> {/*sign up */}
      </div>
      

    </main>
  )
}
