export default new class Component{
    item;
    Button(props:{
        size: "l" | "m" | "s",
        type: 'solid' | 'solid-inverted' | 'solid-indigo' | 'solid-indigo-inverted' | 'solid-light' | 'outline' | 'outline-indigo' | 'outline-inverted' | 'transparent' | 'transparent-light' | 'transparent-red' | 'transparent-inverted' | 'facebook' | 'google' | 'apple', 
        ClassNames: string,
        text:string,
        color?: "peach" | "mustard" | "blue",
        icon?,
        iconColor?: "peach" | "mustard" | "blue"}
        ){
        this.item = document.createElement("button");

        this.item.classList.add("sg-button", `sg-button--${props.size}`, `sg-button--${props.type}`)
        props.ClassNames?{this:this.item.classList.add(`${props.ClassNames.split(" ")}`)}:{}
        props.icon?{this:this.item.insertAdjacentHTML("beforeend", /*html*/`
            <span class="sg-button__icon--${props.size}">
                <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                    <svg class="sg-icon__svg">
                        <use xlink:href="#icon-${props.icon}"></use>
                    </svg>
                </div>
            </span>
        `)}:{}
        props.text?{
            this:this.item.insertAdjacentHTML("beforeend", /*html*/`<span class="sg-button__text">${props.text}</span>`)
        }:{
            this:this.item.classList.add("icononly")
        }

        return this.item;
    }
}