let notes = ["notes1", "notes2", "notes3", "notes4"];
let notesTitle = ["onvan1", "onvan2", "onvan3", "onvan4"];
let archiveNotes = [];
let archiveNotesTitle = [];
let deleteNotes = [];
let deleteNotesTitle = [];

function init() {
  updateFromLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderDeleteNotes();
}

function updateFromLocalStorage() {
  notes = getFromLocalStorage("notes");
  notesTitle = getFromLocalStorage("notesTitle");
  archiveNotes = getFromLocalStorage("archiveNotes");
  archiveNotesTitle = getFromLocalStorage("archiveNotesTitle");
  deleteNotes = getFromLocalStorage("deleteNotes");
  deleteNotesTitle = getFromLocalStorage("deleteNotesTitle");
}

function renderNotes() {
  document.getElementById("notes").innerHTML = "";
  for (i = 0; i < notes.length; i++) {
    document.getElementById("notes").innerHTML += noteTemplate(i);
  }
}
function noteTemplate(index) {
  return ` <div class="notes">
          <div class="note">
            <h3>${notesTitle[index]}</h3>
            <p>${notes[index]}</p>
            <span class="button_left" onclick ="moveFromNotesToDeleteNotes(${index})">X</span>
            <span class="button_right" onclick ="moveFromNotesToArchiveNotes(${index})">A</span>
          </div>`;
}
function moveFromNotesToArchiveNotes(index) {
  let archiveNote = notes.splice(index, 1);
  archiveNotes.push(archiveNote);
  let archiveNoteTitle = notesTitle.splice(index, 1);
  archiveNotesTitle.push(archiveNoteTitle);
  saveTolocalStorage("notes", notes);
  saveTolocalStorage("notesTitle", notesTitle);
  saveTolocalStorage("archiveNotes", archiveNotes);
  saveTolocalStorage("archiveNotesTitle", archiveNotesTitle);

  renderNotes();
  renderArchiveNotes();
}

function renderArchiveNotes() {
  document.getElementById("archive_notes").innerHTML = "";
  for (i = 0; i < archiveNotes.length; i++) {
    document.getElementById("archive_notes").innerHTML +=
      archiveNoteTemplate(i);
  }
}

function archiveNoteTemplate(index) {
  return `<div class="note">
          <h3>${archiveNotesTitle[index]}</h3>
          <p>${archiveNotes[index]}</p>
          <span class="button_left" onclick="moveFromArchiveNotesToDeleteNotes(${index})">X</span>
          <span class="button_right" onclick="moveFromArchiveNotesToNotes(${index})">N</span>
        </div>`;
}

function renderDeleteNotes() {
  document.getElementById("delete_notes").innerHTML = "";
  for (i = 0; i < deleteNotes.length; i++) {
    document.getElementById("delete_notes").innerHTML += deleteNoteTemplate(i);
  }
}
function deleteNoteTemplate(index) {
  return `<div class="note">
            <h3>${deleteNotesTitle[index]}</h3>
            <p>text:${deleteNotes[index]}</p>
            <span class="button_left"  onclick="moveFromDeleteNotesToTrash(${index})">X</span>
            <span class="button_right"onclick="moveFromDeleteNotesToNotes(${index})">N</span>
          </div>`;
}
function moveFromTrashToNote(index) {
  let moveNote = deleteNotes.splice(index, 1);
  let moveNoteTitle = deleteNotesTitle.splice(index, 1);
  notes.push(moveNote);
  notesTitle.push(moveNoteTitle);
  saveTolocalStorage("notes", notes);
  saveTolocalStorage("notesTitle", notesTitle);
  saveTolocalStorage("deleteNotes", deleteNotes);
  saveTolocalStorage("deleteNotesTitle", deleteNotesTitle);
  renderNotes();
  renderDeleteNotes();
}

function addNote() {
  let titleInputRef = document.getElementById("title_input");
  let noteInputRef = document.getElementById("note_input");
  notesTitle.push(titleInputRef.value);
  notes.push(noteInputRef.value);
  saveTolocalStorage("notes", notes);
  saveTolocalStorage("notesTitle", notesTitle);
  renderNotes();
  titleInputRef.value = "";
  noteInputRef.value = "";
  titleInputRef.focus();
}

function moveFromNotesToDeleteNotes(index) {
  let deletedNote = notes.splice(index, 1);
  deleteNotes.push(deletedNote);
  let deletedNoteTitle = notesTitle.splice(index, 1);
  deleteNotesTitle.push(deletedNoteTitle);
  saveTolocalStorage("notes", notes);
  saveTolocalStorage("notesTitle", notesTitle);
  saveTolocalStorage("deleteNotes", deleteNotes);
  saveTolocalStorage("deleteNotesTitle", deleteNotesTitle);
  renderNotes();
  renderDeleteNotes();
}

function moveFromArchiveNotesToNotes(index) {
  let note = archiveNotes.splice(index, 1);
  let noteTitle = archiveNotesTitle.splice(index, 1);
  notes.push(note);
  notesTitle.push(noteTitle);

  saveTolocalStorage("arrchiveNotes", archiveNotes);
  saveTolocalStorage("arrchiveNotesTitle", archiveNotesTitle);
  saveTolocalStorage("notes", notes);
  saveTolocalStorage("notesTitle", notesTitle);

  renderArchiveNotes();
  renderNotes();
}

function moveFromArchiveNotesToDeleteNotes(index) {
  let deletedNote = archiveNotes.splice(index, 1);
  let deletedNoteTitle = archiveNotesTitle.splice(index, 1);
  deleteNotes.push(deletedNote);
  deleteNotesTitle.push(deletedNoteTitle);

  saveTolocalStorage("archiveNotes", archiveNotes);
  saveTolocalStorage("archiveNotesTitle", archiveNotesTitle);
  saveTolocalStorage("deleteNotes", deleteNotes);
  saveTolocalStorage("deleteNotesTitle", deleteNotesTitle);

  renderArchiveNotes();
  renderDeleteNotes();
}

function moveFromDeleteNotesToNotes(index) {
  let note = deleteNotes.splice(index, 1);
  let noteTitle = deleteNotesTitle.splice(index, 1);
  notes.push(note);
  notesTitle.push(noteTitle);

  saveTolocalStorage("deleteNotes", deleteNotes);
  saveTolocalStorage("deleteNotesTitle", deleteNotesTitle);
  saveTolocalStorage("notes", notes);
  saveTolocalStorage("notesTitle", notesTitle);

  renderDeleteNotes();
  renderNotes();
}

function moveFromDeleteNotesToTrash(index) {
  deleteNotes.splice(index, 1);
  deleteNotesTitle.splice(index, 1);

  saveTolocalStorage("deleteNotes", deleteNotes);
  saveTolocalStorage("deleteNotesTitle", deleteNotesTitle);

  renderDeleteNotes();
}

function saveTolocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  if (JSON.parse(localStorage.getItem(key)) === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}
