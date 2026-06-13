let Notes=[{
  id: "1234",
  title: "My Note",
  content: "Hello",
  createdAt: "2026-06-13"
}]
function getNote(){ 
    return Notes
}
function addANote(title,content){
    const newNote={
        id:Date.now().toString(),
        title,
        content,
        createdAt:Date.toLocaleString('en-GB')

    }
    Notes.push(newNote)

}
function DeleteNote(id){
    Notes=Notes.filter(note=>note.id!==id)
    return Notes

}
function UpdateNote(id,title,content){
    const index=Notes.findIndex(note=>note.id===id)
    if (index===-1) return null
    Notes[index].title=title
    Notes[index].content=content
    return Notes[index]
    
}

export { getNote, addANote, DeleteNote, UpdateNote }