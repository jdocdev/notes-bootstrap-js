// Variables
const formNotes = document.querySelector("#formNotes");
const listNotes = document.querySelector("#listNotes");

// Iniciar arreglo de notas
let notes = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // agregar una nueva nota
    formNotes.addEventListener("submit", addNote);

    // preguntar por los datos almacenados
    document.addEventListener("DOMContentLoaded", () => {
        notes = JSON.parse(localStorage.getItem("notes")) || [];

        createHTML();
    });
}

// Funciones
function addNote(e) {
    e.preventDefault();

    // textarea para las notas
    const note = document.querySelector("#note").value;
    // validación de campo
    if (note === "") {
        noteError("Cannot be an empty note!");
        // Prevenir ejecutar mas lineas
        return;
    }

    const noteOBJ = {
        id: Date.now(),
        note: note,
    };

    // añadir nota al arreglo
    notes = [...notes, noteOBJ];

    // luego de agregar la nota pintarla en el html
    createHTML();

    //   Reiniciar el formulario
    formNotes.reset();
}

// Mostrar mensaje de error
function noteError(error) {
    const noteError = document.createElement("p");
    noteError.textContent = error;
    noteError.classList.add("alert", "alert-warning");

    // Insertar error
    formNotes.appendChild(noteError);

    // Eliminar el mensaje
    setTimeout(() => {
        noteError.remove();
    }, 2500);
}

function createHTML() {
    clearHTML();
    if (notes.length > 0) {
        notes.forEach((note) => {
            // Crear el contenedor para el texto de la nota
            const noteContainer = document.createElement('div');
            noteContainer.classList.add("d-flex", "justify-content-between")
            noteContainer.textContent = note.note;

            // Agregar un botón de eliminar
            const btnDelete = document.createElement('a');
            btnDelete.classList.add("text-danger", "text-decoration-none", "btn");
            btnDelete.textContent = "x";

            // Añadir la función de eliminar
            btnDelete.onclick = () => {
                deleteNote(note.id);
            }

            // Agregar el botón al contenedor
            noteContainer.appendChild(btnDelete);

            // Crear la lista item y agregar el contenedor de nota
            const li = document.createElement("li");
            li.appendChild(noteContainer);

            // Insertarlo en el HTML
            listNotes.appendChild(li);
        });
    }
    syncStorage();
}

// Agregar las Notas al localstorage
function syncStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Eliminar nota
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    createHTML();
}

// Limpiar el html
function clearHTML() {
    while (listNotes.firstChild) {
        listNotes.removeChild(listNotes.firstChild);
    }
}
