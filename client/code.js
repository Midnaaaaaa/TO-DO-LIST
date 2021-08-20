const socket = new WebSocket('wss://todo-server.ijuaagi.repl.co');


socket.addEventListener('message', function(event){
    let tamany = event.data.length;
    if(event.data[0] === "d"){
        let tickMark = todoList.firstChild;
        for(let i = 0; i < count; ++i){
            if("d<li>"+tickMark.innerHTML + "<label>      ✔</label></li>" === event.data) doneTask(tickMark);
            else tickMark = tickMark.nextSibling;
        }
    }
    else if(event.data[0] === "e"){
        let buttonx = todoList.firstChild;
        console.log(event.data, buttonx);
        for(let i = 0; i < count; ++i){
            if("e"+buttonx.outerHTML === event.data) deleteTask(buttonx);
            else buttonx = buttonx.nextSibling;
        }
    }
    else if(event.data === "clear"){
        clearList();
    }
    else{
        console.log("Received submit" , event.data);
        let info = event.data;
        submitInfo(info);
    }
});



let itemBox = document.getElementById("itemBox");
let submitBox = document.getElementById("submitBox");
let clearBox = document.getElementById("clearBox");

submitBox.addEventListener("click", function(){
    submitInfo(itemBox.value);
    if(itemBox.value.length !== 0){
        socket.send(itemBox.value);
        itemBox.value = '';
    }

});
clearBox.addEventListener("click", function(){
    clearList();
    socket.send("clear");
});

let count = 0;

let todoList = document.createElement("ol");
document.querySelector(".list").appendChild(todoList);

function submitInfo(info){
    if(info.length === 0){
        alert("Error, write a task in the textbox");
    }
    else{
        let listElement = document.createElement('li');
        let listElementInfo = document.createTextNode(info + "   ");
        let xElement = document.createElement("button");
        let doneElement = document.createElement("button");
        xElement.innerHTML = "X";
        doneElement.innerHTML = "Done";
        doneElement.addEventListener("click", function(){
            doneTask(listElement);
            socket.send("d"+listElement.outerHTML);
            console.log(listElement.outerHTML);
        });
        listElement.appendChild(listElementInfo);
        listElement.appendChild(xElement);
        listElement.appendChild(doneElement);
        todoList.appendChild(listElement);
        ++count;
        xElement.addEventListener("click" , function(){
            deleteTask(listElement);
            socket.send("e" + listElement.outerHTML);
        });
    }
}

/**
 * @param {MouseEvent} ev
 * @this {HTMLButtonElement} button
 */
function deleteTask (listElement){
    listElement.remove();
    --count;
}

function doneTask(listElement){
    let tickMark = document.createElement("label");
        tickMark.textContent="      " + String.fromCodePoint(0x2714);
    if(listElement.lastChild.innerHTML === "Done"){
        listElement.appendChild(tickMark);
    }
    else alert("Task is already done");
}
    
function clearList(){
    for(let i=0; i < count; ++i){
        todoList.firstChild.remove();
    }
    count = 0;
}






