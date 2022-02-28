const socket = io('http://localhost:8000');
// var io = require('socket.io-client');
// var socket = io.connect('http://localhost:8000', {reconnect: true});

// Add a connect listener

// get DOM elements in respective 3s variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const heading = document.querySelector(".heading");

// audio for notification
var audio = new Audio('ting.mp3')

const append = (message, position) => {
    if(position === 'center'){
        const messageElement = document.createElement('div');
        messageElement.innerText = message
        messageElement.classList.add('message')
        messageElement.classList.add(position)
        messageContainer.append(messageElement);
        return null;
    }
    const img = document.createElement('img');
    img.src = "profile.jfif"
    img.classList.add('avtarImg')
    img.classList.add(position)
    const maindiv = document.createElement('div');
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.append(img);
    if(position === 'left'){
        audio.play();
    }
}
const updateName = (head) => {
    heading.innerHTML= `<i class="fa-solid fa-circle"></i> ${head}`
}

// ask new user for his or her name 
const name = prompt("enter your name to join chat ");
updateName(name);
socket.emit('new-user-joined', name);

// if new user join receive his/her name the event from the srver
socket.on("user-joined", name =>{
    append(`${name} :  joined the chat` , 'center')
})

// if server sends receive message 
socket.on("receive", data =>{
    append(`${data.name} :  ${data.message } ` , 'left')
})

// if user leaves the chat , append the info to the container
socket.on("left", name =>{
    append(`${name}  :    left the chat ` , 'center')
})

// if form get submitted send server message 
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}` , 'right');
    socket.emit('send', message);
    messageInput.value = " ";
})
