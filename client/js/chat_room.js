import { VElement } from "../framework/VElement.js";
// import { Timer } from "../utils/util.js";

export class ChatRoom extends VElement{
    constructor(props) {
        super('div', {id:'chat'}, [
            new VElement('div', { class: 'chat-container' }, [
            new VElement('div', { class: 'messages', id: 'messages' }, []),
            new VElement('div', { class: 'input-container' }, [
                new VElement('input', { type: 'text', id: 'messageInput', placeholder: 'Type your message...' }, []),
                new VElement('button', { onClick: props.onSendMessage}, 'Send')
            ])
        ])]);
    }

    displayMessages(username, avatar, message) {
        const messagesContainer = document.getElementById('messages');
        // messagesContainer.innerHTML = '';
        const messageElement =  new VElement('div', { class: 'message' }, [
            new VElement('span', {},`${avatar}`),
            new VElement('span', {}, `${username}: ${message}`)
        ]).render();
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}


