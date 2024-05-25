import { VElement } from "../framework/VElement.js";

export class RegisterForm extends VElement {
    constructor(props) {

        super('div', { class: 'register-container' }, [
            new VElement('h1', {}, 'Register'),
            new VElement('input', { type: 'text', id: 'name', placeholder: 'Enter your name' }, []),
            new VElement('select', { id: 'avatar' },  ['😀', '😎', '😇', '👽', '🤨', '😤'].map(emoji => new VElement('option', { value: emoji }, emoji))),
            new VElement('button', { onclick: props.onClick }, 'Login')
        ]);
    }
}
