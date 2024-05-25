export class VElement {
    constructor(tag, attrs, children) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = Array.isArray(children) ? children : (children ? [children] : []);
    }

    render() {
        const element = document.createElement(this.tag);
        Object.keys(this.attrs).forEach(attr => {
            if (attr.startsWith('on') && attr !== 'onclick') {
                const eventType = attr.substring(2).toLowerCase();
                element.addEventListener(eventType, this.attrs[attr]);
            } else if (attr === 'onclick') {
                element.onclick = (event) => {
                    event.preventDefault();
                    this.attrs[attr](event);
                };
            } else {
                element.setAttribute(attr, this.attrs[attr]);
            }
        });

        this.children.forEach(child => {
            const childElement = child instanceof VElement ? child.render() : document.createTextNode(child);
            element.appendChild(childElement);
        });
        return element;
    }
}
