"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addANote } from "@/lib/store";

export default function Create() {
    const router=useRouter()
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")

    async function save(){
    await fetch('/api/notes', {
        method: 'POST',
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

    return(<div><input placeholder="Title"onChange={updateTitle}></input>
        <br/>
        <input placeholder="Start writing here" onChange={updatecontent}></input>
        <button onClick={save}>Save</button>
        </div>
    );
}