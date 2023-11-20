"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function SearchBar(){
    const [nama,setNama] = useState("")
    
    async function handleInput(e){
        e.preventDefault()
        await fetch('http://localhost:3000/api/homeAdmin'),{cache:'no-store'},{
            method:'GETSEARCH',
            Headers:{
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                nama:nama
            })
        }
    setNama("")
    
    }

    return(
        <form onSubmit={handleInput}>
        <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Cari Mata Kuliah"></input>
        <button className="btn bg-cyan-700 text-white border-none" type="button">Search</button>
        </form>
    )
}