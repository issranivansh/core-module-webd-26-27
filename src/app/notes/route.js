import { getNote } from "@/lib/store";
import { addANote } from "@/lib/store";
export async function GET(){
    return Response.json({ success: true, notes: getNote() })
}
import { getNote, addANote } from "@/lib/store";

export async function POST(request) {
    const body = await request.json()
    const title=body.title
    const content=body.content
    const errors = []
    if (!title || title.length < 3) errors.push("Title must be at least 3 characters")
    if (!content || content.length < 10) errors.push("Content must be at least 10 characters")
    if (title.length > 100) errors.push("Title must not exceed 100 characters")
    if (errors.length > 0) {
        return Response.json({ success: false, errors }, { status: 400 })
    }
    const note = addANote(title, content)
    return Response.json({ success: true, message: "Note created successfully", note }, { status: 201 })
}