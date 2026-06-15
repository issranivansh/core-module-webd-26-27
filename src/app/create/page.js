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

    return(<div  className=" h-screen flex flex-col p-5 ">
        <input placeholder="Title"onChange={updateTitle} className=" bg-[#79553D] text-6xl font-bold text-[#F4F0E6] w-full font-silkscreen rounded-md my-6  text-center"></input>
        <br/>
        <textarea placeholder="Start writing here" onChange={updatecontent}className="w-full h-full  border-[#79553D] border-2 flex-1 font-dotgothic text-[20px]"></textarea>
        <button onClick={save}className="border-retro-brown w-15 h-10 bg-[#79553D] text-[#F4F0E6] font-dotgothic block mx-auto ">Save</button>
        </div>
    );
}