// * Html Element 
var newTask = document.getElementById("newTask");
var modal = document.getElementById("modal");
var statusInput = document.getElementById("status");
var categoryInput = document.getElementById("category");
var titleInput = document.getElementById("title");
var descriptionInput = document.getElementById("description");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var searchInput = document.getElementById("searchInput");


// var description = document.getElementById("description");


// ! App Variables
var updateIndex;
var taskArray = getFromLocalStorage();
var titleRegex = /^[A-Z][a-z]{3,}$/;
var descriptionRegex = /^[\w\s]{25,100}$/;
var containers = {
    nextUp : document.querySelector("#nextUp"),
    inProgress : document.querySelector("#inProgress"),
    done : document.querySelector("#done"),
}
var countersElement = {
        nextUp : document.querySelector("#nextUp").querySelector("span"),
    inProgress : document.querySelector("#inProgress").querySelector("span"),
    done : document.querySelector("#done").querySelector("span"),
}
displayAllTasks();
// & Function
function showModal(){
    window.scroll(0,0)
    document.body.style.overflow = "hidden";
modal.classList.replace("d-none","d-flex");
}
function hideModal(){
modal.classList.replace("d-flex","d-none");
    document.body.style.overflow = "auto";
}
function addTask(){

if(validate(titleInput,titleRegex )&&validate(descriptionInput,descriptionRegex)){

    var task=
    {
status:statusInput.value,
title:titleInput.value,
description:descriptionInput.value,
category:categoryInput.value,
bgColor:"#0d1117",
    };
    
    taskArray.push(task);
    setToLocalStorage()
    console.log(task);
    display(taskArray.length-1);
    hideModal();

}
else{
    alert("some thing wrong")
}

}

function display(index){
    updateIndex = index
    var taskHtml = `
    <div class="task " style="background-color:${taskArray[index].bgColor}">
  <h3 class="text-capitalize">${taskArray[index].title}</h3>
   <p class="description text-capitalize">${taskArray[index].description}</p>
   <h4 class="category text-capitalize ${taskArray[index].category}">${taskArray[index].category}</h4>
   <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0"> 
   <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
   <li><i class="bi bi-trash-fill" onClick="deleteTask(${index})"></i></li>
   <li><i class="bi bi-palette-fill" onClick="changeBg(event,${index})"></i></li>
    </ul>
</div>
    `
    containers[taskArray[index].status].querySelector(".tasks").innerHTML += taskHtml;
    setCounter(taskArray[index].status)
}
function setToLocalStorage(){
localStorage.setItem("tasks",JSON.stringify(taskArray))
}
function getFromLocalStorage(){
return JSON.parse(localStorage.getItem("tasks")) || []
}
function displayAllTasks() {
    for(var i = 0 ; i<taskArray.length ;i++){
        display(i)
    }
}
function setCounter(status){
    countersElement[status].innerHTML = +countersElement[status].innerHTML + 1
}
function deleteTask(index){
taskArray.splice(index,1)
setToLocalStorage()
resetContainers();
resetCounters();
displayAllTasks()
}
function resetContainers(){
    for (key in containers){
        containers[key].querySelector(".tasks").innerHTML = "";
    }
}
function resetCounters(){
    for (key in countersElement){
        countersElement[key].innerHTML = 0;
    }
}
function getTaskInfo(index){
showModal()
statusInput.value=taskArray[index].status;
categoryInput.value = taskArray[index].category;
titleInput.value=taskArray[index].title;
descriptionInput.value=taskArray[index].description;
addBtn.classList.replace("d-block","d-none");
updateBtn.classList.replace("d-none","d-block");
}
function update(){
taskArray[updateIndex].status = statusInput.value;
taskArray[updateIndex].title = titleInput.value;
taskArray[updateIndex].description=descriptionInput.value;
taskArray[updateIndex].category = categoryInput.value;
setToLocalStorage();
resetContainers();
resetCounters();
displayAllTasks();
hideModal()
}
function search(){
    resetContainers();
    resetCounters();
    var term = searchInput.value;
    
    for(var i=0 ;i<taskArray.length;i++){
if(taskArray[i].title.toLowerCase().includes(term.toLowerCase()) || 
taskArray[i].category.toLowerCase().includes(term.toLowerCase()) ){
display(i)
}

    }
}
function validate(element,regex){
    if(regex.test(element.value)){
        console.log("okay");
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.parentElement.nextElementSibling.classList.replace("d-block","d-none")  
return true
    }
    else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid") 
        element.parentElement.nextElementSibling.classList.replace("d-none","d-block")  
   return false }
}
function changeBg(event,index){
    const colors = ["#FAF6E9","#A1EEBD","#6482AD"];
   const color = colors[Math.trunc(Math.random() * colors.length)]
taskArray[index].bgColor = color
setToLocalStorage()
event.target.closest(".task").style.backgroundColor = color
}
// ^ Events
updateBtn.addEventListener("click",function(){
    update()
})
newTask.addEventListener("click",showModal)
modal.addEventListener("click",function(event){
    if(event.target==modal){
        hideModal()
    }
    
})
document.addEventListener("keyup",function(event){
      if(event.code=="Escape"){
        hideModal()
    }  
})
addBtn.addEventListener("click",function(){
    // console.log(task)
    addTask()
})
searchInput.addEventListener("input",function(){
    search()
})
titleInput.addEventListener("input",function(){
    validate(titleInput,titleRegex)
})
descriptionInput.addEventListener("input",function(){
    validate(descriptionInput,descriptionRegex)
})