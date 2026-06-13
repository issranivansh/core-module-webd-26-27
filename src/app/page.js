"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"  

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
    return (
        <div>
            <h1>Notes</h1>
            {notes.map((note) => (
                <div key={note.id}>
                    <label onClick={()=>router.push(`/edit/${note.id}`)}>{note.title}</label>
                    <button onClick={()=>handleDelete(note.id)}>✖</button>
                </div>
            ))}
            <button onClick={() => router.push('/create')}>Create</button>
        </div>
    )
}