"use client"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"
export default function edit({params}){
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
                    setTitle(note.title)
                    setContent(note.content)
                })
        })
    }, [])
    async function save(){
        await fetch(`http://localhost:3000/api/notes/${id}`, {
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
        <div>
            <input value={title} onChange={updateTitle}></input><br/>
            <input value={content} onChange={updatecontent}></input><br/>
            <button onClick={save}> Save</button>
        </div>
    )

}
