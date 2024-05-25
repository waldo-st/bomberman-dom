import { Router } from "../framework/Router.js";
import { Store } from "../framework/Store.js";
import { ChatRoom } from "./chat_room.js";
import { RegisterForm } from "./register.js";
import { config } from "../config/config.js";
import { timerWait } from "../utils/util.js";

const timer = new timerWait()
const store = new Store({username:"", avatar:"",message:[]})
const router = new Router({
    "/": ()=>renderRegister(),
    "/chat": ()=>renderChat()
})

function renderRegister(){
    const register = new RegisterForm({
        onClick:()=>{
            const username = document.getElementById('name').value;
            const avatar = document.getElementById('avatar').value;
            store.updateState({username, avatar})
            router.navigate("/chat")
        }
    })
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(register.render());
}

function renderChat(){
    const {username, avatar} = store.getState()
    const chatRoom = new ChatRoom({
        onSendMessage:()=>{
            console.log(username, avatar);
            const Input = document.getElementById("messageInput")
            const msg = Input.value
            sendMessage(username, avatar, msg)
            Input.value=""
        }
    })
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(chatRoom.render());
    
    document.getElementById('chat').appendChild(timer.render())

    // init websocket...
    const ws = new WebSocket(`ws://${config.websocket.hostname}:8080`)
    ws.onopen=()=>{
        console.log("connection establish...")
        const join = "join"
        ws.send(JSON.stringify({ username, avatar}));
        window.ws=ws
    }
    ws.onmessage=(event)=>{
        const {username, avatar, message} = JSON.parse(event.data)
        if (message === undefined){
            console.log(message)
            timer.roomWait(avatar, username)
            return
        }
        chatRoom.displayMessages(username, avatar, message)
    }
    ws.onclose=()=>{
        console.log("close ws...");
    }
    function sendMessage(username, avatar, message) {
        ws.send(JSON.stringify({ username, avatar, message }));
     }
}

renderRegister()