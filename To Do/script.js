const todoInput = document.querySelector(".todo_input");
const addBtn = document.querySelector(".add_btn");
const entList = document.querySelector(".ent_list");
const btnAll = document.querySelector(".all");
const btnActive = document.querySelector(".active");
const btnCompleted = document.querySelector(".completed");
const linethroughItems = document.getElementsByClassName("item");

addBtn.addEventListener("click", () => {
    if(todoInput.value != 0) {
        let newItem = document.createElement("li");
        newItem.classList.add("item");
        newItem.innerHTML = `<input type="checkbox" class="ckeck">${todoInput.value}`;
        entList.appendChild(newItem);
        todoInput.value = "";
    };
});

entList.addEventListener("click", (e)=>{
    if(e.target.classList.contains("ckeck")){
        e.target.parentElement.classList.toggle("linethrough");
    };
});

btnCompleted.addEventListener("click", ()=>{
   for (let i = 0; i < linethroughItems.length; i++) {
    linethroughItems[i].classList.remove("hidden");
    if(!(linethroughItems[i].classList.contains("linethrough"))){
        linethroughItems[i].classList.add("hidden");
    };
  };
});

btnAll.addEventListener("click", ()=>{
    for (let i = 0; i < linethroughItems.length; i++) {
        linethroughItems[i].classList.remove("hidden");
    };
 });

btnActive.addEventListener("click", ()=>{
    for (let i = 0; i < linethroughItems.length; i++) {
        linethroughItems[i].classList.remove("hidden");
     if(linethroughItems[i].classList.contains("linethrough")){
         linethroughItems[i].classList.add("hidden");
     };
   };
});