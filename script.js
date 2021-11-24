//Global varibales
let myLibrary = [];
const addBookBtn = document.querySelector(".addBook");
const overlay = document.getElementById("overlay");
const form = document.querySelector(".form");
const container = document.querySelector(".container");
const submit = document.querySelector("#submit");
const library = document.getElementById("library");


//Library Functions
function showForm() {
  overlay.style.display = "flex";
  container.style.display = "block";
  form.style.display = "block";
}

function hideForm() {
  overlay.style.display = "none";
  form.style.display = "none";
  container.style.display = "none";
}

function submitBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const pages = document.getElementById("pages").value;
  const format = document.getElementById("format").value;
  const haveRead = document.getElementById("haveRead").value;
  
  const newBook = new book(title, author, category, pages, format, haveRead);
   
  myLibrary.push(newBook);
  populateStorage();
  loadLibrary(myLibrary)
  form.reset();
}

// function book(title, author, category, pages, format, haveRead) {
//   this.title = title;
//   this.author = author;
//   this.category = category;
//   this.pages = pages;
//   this.format = format;
//   this.haveRead = haveRead;
// }

class book {
  constructor (title, author, category, pages, format, haveRead) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.format = format;
    this.haveRead = haveRead;
  }
}



function populateStorage() {
  let myLibraryString = JSON.stringify(myLibrary);
  localStorage.setItem('myLibrary', myLibraryString);
}

function pageLoad() {
  if (localStorage.getItem('myLibrary')) myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  loadLibrary(myLibrary);
}

function removeRow() {
  deletedBook = myLibrary.splice(this.dataset.rowNum - 1, 1);
  populateStorage();
  loadLibrary(myLibrary);
}

function readStatus() {
  const i = this.dataset.rowNum;
  (myLibrary[i-1].haveRead === "Yes") ? myLibrary[i-1].haveRead = "No" : myLibrary[i-1].haveRead = "Yes" ;
  loadLibrary(myLibrary);
  }

function loadLibrary(arr) {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  
  if (arr.length > 0) {
  const myKeys = Object.keys(arr[0]);
    for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement("tr");
    myKeys.forEach((key) => {
      let td = document.createElement("td");
      td.dataset.rowNum = i + 1;
      td.innerHTML = arr[i][key];
      tr.appendChild(td);
    });
  
    for (let j = 1; j < 3; j++) {
      let td = document.createElement("td");
      let btn = document.createElement("button");
      (j === 1) ? btn.innerHTML = "Change" : btn.innerHTML = "Remove";
      btn.className = "button";
      btn.dataset.rowNum = i + 1;
      td.appendChild(btn);
      tr.appendChild(td);
      (j === 1) ? btn.addEventListener("click",readStatus) : btn.addEventListener("click",removeRow);
    }
    table.appendChild(tr);    
  }
  }
}

// //Event handlers
addBookBtn.addEventListener("click", showForm);
overlay.addEventListener("click", hideForm);
submit.addEventListener("click", submitBook);
window.addEventListener("load",pageLoad);


