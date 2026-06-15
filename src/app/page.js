"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"  
import React from "react"

export default function Home() { 

    const router = useRouter()    
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('/api/notes')
            .then(res => res.json())
            .then(data => setNotes(data.notes || []))
    }, [])
    async function handleDelete(id){
    await fetch(`/api/notes/${id}`, { method: 'DELETE' })
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data.notes || [])
}
    return (<>
        <div className="mx-auto">
            <h1 className=" bg-[#79553D] text-6xl font-bold text-[#F4F0E6] flex justify-center items-center font-silkscreen rounded-md my-6 mx-6 p ">Notes</h1>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                <div  className="flex items-center justify-center gap-2">
                    
                    <label onClick={()=>router.push(`/edit/${note.id}`)} className="block mx-autoflex justify-center items-center  font-dotgothic hover:opacity-70">{note.title}</label>
                    <button onClick={()=>handleDelete(note.id)} className=""><img src="/deletenew.png" className="w-6 h-6 hover:bg-[#79553D] border-retro-brown" /></button><br/>
                    
                </div>
                <hr className="font-dotgothic my-6 mx-6 border-[#79553D] border-t-2 p-4"></hr>
                </React.Fragment>
            ))}
            
            <button onClick={() => router.push('/create')}className="block mx-auto mt-6 bg-[#79553D] text-[#F4F0E6] px-6 py-2  hover:opacity-90 font-dotgothic border-retro-brown flex items-center gap-2"><img src="/new.png"className="w-6 h-6 border-retro-brown"></img>Create</button>
        </div>
        </>
    )
}