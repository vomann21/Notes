const addnote = document.querySelector(".addnote"),
popUpBox = document.querySelector(".popup-box"),
popUptitle = popUpBox.querySelector(".header p"),
updatetitle = popUpBox.querySelector(".header p"),
closeIcon = popUpBox.querySelector(".header i"),
overLay = document.querySelector(".overlay");
const addNoteButton = document.querySelector(".Addnotebutton");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");

//getting the content if local storage is not empty
//if it is empty then empty array is passed to the notes.
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, upadateId;

if(addnote){
    addnote.addEventListener("click", ()=>{
        popUptitle.innerHTML= "Add a new note";
        addNoteButton.innerHTML = "Add Note";
        popUpBox.classList.add("active");
        overLay.classList.add("active");
    });
}

closeIcon.addEventListener("click",()=>{
    input.value = "";
    textarea.value = "";

    popUpBox.classList.remove("active");
    overLay.classList.remove("active");
})

function deletenote(noteid){
      let confirmDelete = confirm("Do you want to delete the note");

      if(!confirmDelete) return;

      notes.splice(noteid,1);
      localStorage.setItem("notes",JSON.stringify(notes));
      showNotes();
}

function updateNote(noteid, titleval, descval){
    upadateId = noteid;
    isUpdate = true;
    addnote.click();
    updatetitle.innerHTML= "Read and Update",
    addNoteButton.innerHTML = "Update note";
    input.value = titleval;
    textarea.value = descval;
    
}

function showNotes(){
    document.querySelectorAll(".notes").forEach(notes => notes.remove());
    notes.forEach((note,index)=>{
         let listOfNotes=`<div class="notes">
                                <div class="title">
                                 <h2>${note.titleval}</h2>
                                 <p>${note.descval}</p>
                                </div>
                             <div class="buttons">
                                <button class="submit" onClick="updateNote(${index}, '${note.titleval}', '${note.descval}')">Open</button>
                                <button class="delete" onClick="deletenote(${index})"><i class="fa-sharp fa-solid fa-trash"></i></button>
                             </div>
                           </div>`;
    addnote.insertAdjacentHTML("beforebegin",listOfNotes);
    });
}
showNotes();

addNoteButton.addEventListener("click",()=>{

    let titleval = input.value;
    let descval = textarea.value;
    if(titleval || descval)
    {
        let noteObj = {
             titleval : titleval,
             descval : descval,
        }
        
       if(!isUpdate)
         notes.push(noteObj);

       else{
          notes[upadateId] = noteObj; 
          isUpdate = false;
       }

       localStorage.setItem("notes",JSON.stringify(notes));
       showNotes();
    }
    closeIcon.click();
})






