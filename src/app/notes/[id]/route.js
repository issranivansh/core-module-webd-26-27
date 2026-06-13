import { DeleteNote, UpdateNote } from "@/lib/store"
import { getNote } from "@/lib/store"
export async function DELETE(request, { params }) {
    const { id } = await params
    const notes = getNote()
    const exists = notes.find(note => note.id === id)
    if (!exists) return Response.json({ success: false, errors: ["Note not found"] }, { status: 404 })
    return Response.json({success:true, message: "Note deleted successfully",notes:DeleteNote(id) });
}
export async function PUT(request, { params }) {
    const { id } = await params
    const body = await request.json()
    const { title, content } = body
    const notes = getNote()
    const errors = []
    if (!title || title.length < 3) errors.push("Title must be at least 3 characters")
    if (!content || content.length < 10) errors.push("Content must be at least 10 characters")
    if (title.length > 100) errors.push("Title must not exceed 100 characters")
    if (errors.length > 0) {
        return Response.json({ success: false, errors }, { status: 400 })
    }
    const exists = notes.find(note => note.id === id)
    if (!exists) return Response.json({ success: false, errors: ["Note not found"] }, { status: 404 })
    return Response.json({success:true, message: "Note edited successfully",notes:UpdateNote(id,title,content) });
}