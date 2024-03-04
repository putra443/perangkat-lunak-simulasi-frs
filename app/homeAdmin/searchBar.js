"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
// import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"
import { headers } from "@/next.config"
export default function SearchBar(){
    const searchRef = useRef()
    const router = useRouter()
    const handleSearch = (e) => {
        e.preventDefault()
        console.log(searchRef.current.value.length <1);
        if(searchRef.current.value.length<1){
            router.push('/homeAdmin')
        }
        else{
            // console.log(searchRef.current.value);
        router.replace(`http://localhost:3000/homeAdmin/search/${searchRef.current.value}`)
        }
    }

    return(
        <div>
        <input className="input w-2/3 input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Cari Mata Kuliah" ref={searchRef}></input>
            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-cyan-800 m-2 px-6" onClick={handleSearch}>
                search
            </button>
        </div>
    )
}