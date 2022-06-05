export default new class Component{
    item;
    constructor(){
        this.item = document.createElement("div")
    }
    Button(props:{
        size: "l" | "m" | "s",
        type: 'solid' | 'solid-inverted' | 'solid-indigo' | 'solid-indigo-inverted' | 'solid-light' | 'outline' | 'outline-indigo' | 'outline-inverted' | 'transparent' | 'transparent-light' | 'transparent-red' | 'transparent-inverted' | 'facebook' | 'google' | 'apple', 
        IconOnly: boolean,
        ClassNames: string,
        text?:string,
        color?: "peach" | "mustard" | "blue",
        icon?,
        iconColor?: "peach" | "mustard" | "blue"}
        ){
        this.item.outerHTML = /*html*/`
            <button class="sg-button sg-button--${props.size} sg-button--${props.type} ${props.ClassNames}">
                <span class="sg-button__icon sg-button__icon--${props.size}">
                    <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                        <svg class="sg-icon__svg">
                            <use xlink:href="#${props.icon}"></use>
                        </svg>
                    </div>
                </span>
                <span class="sg-button__text">${props.text}</span>
            </button>
        `
        return this.item;
    }
}