document.addEventListener('DOMContentLoaded', function(evt) {
    hideNotesInArticles();

    if (window.location.href.indexOf("notes") > 0) {
        //Insert CSS
        insertNotesCss();

        //Insert notes div
        createNotesElement();

        //Add listener to show current notes
        document.addEventListener("slideenter", function(evt) {
            showSlideNotes();
        });

        //Show notes for first slide
        showSlideNotes();
    }
});

function hideNotesInArticles(){
    //Hide notes on slides
    var allNotes = document.querySelectorAll('.notes');
    for (var i = 0; i < allNotes.length; i++) {
        var note = allNotes[i];
        note.style.display = 'none';
    }
}


function createNotesElement() {
    var notesDiv = document.createElement('div');
    document.body.appendChild(notesDiv);
    notesDiv.setAttribute('id', '_notes');

    var notesHandle = document.createElement("div");
    notesDiv.appendChild(notesHandle);
    notesHandle.addEventListener('click', handleNotesClick);
    notesHandle.addEventListener('touchend', handleNotesClick);

    var notesContent = document.createElement("div");
    notesContent.setAttribute('id', 'content');
    notesDiv.appendChild(notesContent);
}

function handleNotesClick(evt) {
    var notes = document.querySelector('#_notes');
    console.log(evt, notes);
    notes.classList.toggle('hide');
}

function showSlideNotes() {
    var slideNotes = document.querySelector('.current .notes');
    var notes = document.querySelector('#_notes > #content');
    console.log(notes);
    if (slideNotes) {
        notes.innerHTML = slideNotes.innerHTML;
    }
    else {
        notes.innerHTML = '';
    }
}

function insertNotesCss() {
    var el = document.createElement('link');
    el.rel = 'stylesheet';
    el.type = 'text/css';
    el.href = 'js/slides/notes.css';
    document.body.appendChild(el);
}

