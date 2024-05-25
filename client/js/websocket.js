// import { config } from "../config/config.js"
// import { ChatRoom } from "./chat_room.js"
// // const send = document.querySelector(".send")
// // const message = document.querySelector(".containeChat")
// // const box = document.querySelector(".text")
// const chat = new ChatRoom()
// const messageInput = document.getElementById('messageInput');
// const send = document.getElementById('send');

// let ws

// export const initWs=()=>{
   
//     if (ws){
//         ws.onerror=ws.onopen=ws.onclose=null
//         ws.close()
//     }
//     // const hostname = window.location.hostname;
//     ws = new WebSocket(`ws://${config.websocket.hostname}:8000`)
//     ws.onopen=()=>{
//         console.log("connection establish...")
//         // window.ws=ws
//     }
//     ws.onmessage=({data})=>chat.displayMessages(data)
//     ws.onclose=()=>{
//         ws=null
//         console.log("close ws...");
//     }
//     chat.sendMessage(ws)
// }

// send.onclick = () => {
//     const messageText = messageInput.value.trim();
//     console.log(ws)
//     if (messageText) {
//         if (!ws){
//             chat.displayMessages("NO ws ...")
//             return
//         }
//         ws.send(messageText)
//         messageInput.value = '';
//         messageInput.focus();
//     }
// }

// // send.onclick=()=>{
// //     if (!ws){
// //         showMsg("NO ws ...")
// //         return
// //     }
// //     ws.send(box.value)
// //     // showMsg(box.value)
// //     box.value=""
// // }
