"use client"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"
export default function Edit({params}){
    const router=useRouter()
    const [title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const [id,setId]=useState("")
    useEffect(() => {
        params.then(p => {
            const { id } = p
            setId(id)
            fetch('/api/notes')
                .then(res => res.json())
                .then(data => {
                    const note = data.notes.find(n => n.id === id)
                    if (!note) return  // ← add this
                    setTitle(note.title)
                    setContent(note.content)
                })
        })
    }, [])
    async function save(){
        await fetch(`/api/notes/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
        router.push('/')
    }
    function updatecontent(event){
        setContent(event.target.value)
    }
    function updateTitle(event){
        setTitle(event.target.value)
    }
    return(
        <div className=" h-screen flex flex-col p-5 ">
            <input value={title} onChange={updateTitle}className=" bg-[#79553D] text-6xl font-bold text-[#F4F0E6] w-full font-silkscreen rounded-md my-6  text-center py-4"></input>
            <textarea value={content} onChange={updatecontent} className="w-full h-full  border-[#79553D] border-2 flex-1 font-dotgothic text-[20px]"></textarea>
            <button onClick={save}className="border-retro-brown w-15 h-10 bg-[#79553D] text-[#F4F0E6] font-dotgothic block mx-auto "> Save</button>
        </div>
    )

}
