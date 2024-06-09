"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar(){
   const [param, setParam] = useState("")
   const router = useRouter()


   async function handleSearch(param){
    if(param.length<1){
        router.replace(`${process.env.NEXT_PUBLIC_API_URL}/homeAdmin`)

    }
    else{
        router.replace(`${process.env.NEXT_PUBLIC_API_URL}/homeAdmin/search/${param}`)
    }
    
   }
   

        return(
            <div>
            <input className="input w-2/3 input-berdered bg-white text-black border-cyan-400 border-1" onChange={(e)=>setParam(e.target.value)} placeholder="Cari Mata Kuliah"></input>
                <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-cyan-800 m-2 px-6" onClick={() => handleSearch(param)}>
                    Cari
                </button>
            </div>
        )
    }