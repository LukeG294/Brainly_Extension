import {BoxRadio} from '../../typings/components';

export default new class Form{
    private checkbox:Element
    private radio:Element
    private boxRadio:Element

    Checkbox(props:{
        id:string,
        classes?:[string],
        text?: string,
        Attributes?: {
            key:string,
            value:string
        }[]
    }){
        this.checkbox = document.createElement("div");
        this.checkbox.classList.add("sg-checkbox", "sg-checkbox--dark", "sg-checkbox--with-padding");
        this.checkbox.innerHTML = /*html*/`
            <div class="sg-checkbox__wrapper">
                <div class="sg-checkbox__element">
                    <input class="sg-checkbox__input" id="${props.id}" type="checkbox" aria-checked="false" aria-describedby="" value="">
                    <span class="sg-checkbox__icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.475 8.01008L6.48494 11.0201L12.5249 4.98" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                </div>
            </div>
        `
        props.Attributes? {
            props: props.Attributes.forEach(attr => {
                this.checkbox.querySelector("input").setAttribute(attr.key, attr.value);
            })
        }:{}
        props.classes?{this: this.checkbox.classList.add(...props.classes)}:{}
        props.text?{this:this.checkbox.querySelector(".sg-checkbox__wrapper").insertAdjacentHTML("beforeend", `<label for= ${props.id} class="sg-text sg-text--medium sg-text--bold sg-checkbox__label">${props.text}</label>`)}:{}
        //props.onEnable? {this: this.checkbox.setAttribute("onclick", () => {
        //    this.checkbox.querySelector("input").checked ? {props: props.onEnable()}:{props: props.onDisable()}
        //})}:{}
        return this.checkbox
    }

    BoxSelectRadio(props:{
        items: Array<BoxRadio>
    }):Element{
        this.boxRadio = document.createElement("div");
        this.boxRadio.innerHTML = /*html*/`
            <div class="sg-radio-group" role="radiogroup">
                <div class="sg-radio-group__items sg-radio-group__items--direction-column">
                </div>
            </div>
            `
            props.items.forEach(item=> {
                this.boxRadio.querySelector(".sg-radio-group__items").insertAdjacentHTML("beforeend",/*html*/`
                <label id="myRadioID-${item.id}" style="height: 80px; margin-bottom: 8px; border: 2px solid rgb(225, 234, 241); border-radius: 8px; padding: 8px; display: flex; justify-content: flex-end; align-items: center;">
                    <div class="sg-radio sg-radio--dark">
                        <div class="sg-radio__wrapper">
                            <div class="sg-radio__element">
                                <input class="sg-radio__input" type="radio" id="${item.id}" name="short" aria-labelledby="myRadioID-${item.id}" value="1">
                                <span class="sg-radio__circle" aria-hidden="true"></span>
                            </div>
                        </div>
                        ${item.element}
                    </div>
                </label>`
                )
            })
            return this.boxRadio;
    }
    RadioGroup(props:{
        ClassName?:string[],
        id: string,
        type: "row" | "column",
        LookFor: {
            name: string,
            id: string
        },
        defCheck?: string,
        items: Array<{
            id:string,
            text:string,
            Attributes?: {
                key: string,
                value: string
            }[]
        }>
    }){
        this.radio = document.createElement("div");
        this.radio.innerHTML = /*html*/`
            <div class="sg-radio-group" role="radiogroup">
                <div class="sg-radio-group__items sg-radio-group__items--direction-${props.type}">
                    
                </div>
            </div>
        `
        props.ClassName?{this: this.radio.classList.add(...props.ClassName)}:{}
        props.items.forEach((item, index)=> {
            this.radio.querySelector(".sg-radio-group__items").insertAdjacentHTML("beforeend",/*html*/`
                    <div class="sg-radio sg-radio--dark sg-radio--with-label sg-radio--with-padding">
                        <div class="sg-radio__wrapper">
                            <div class="sg-radio__element">
                                <input class="sg-radio__input" type="radio" name = "${props.id}"  id ="${item[props.LookFor.id] + props.id}" value = "${index}" aria-labelledby="${item[props.LookFor.id] + props.id}-label">
                                <span class="sg-radio__circle" aria-hidden="true"></span>
                            </div>
                            <label id="${item[props.LookFor.id] + props.id}-label" for="${item[props.LookFor.id] + props.id}" class="sg-text sg-text--medium sg-text--bold sg-radio__label">${item[props.LookFor.name]}</label>
                        </div>
                    </div>
            `)
        })
        
        props.defCheck? {this: this.radio.querySelector(`.sg-radio-group__items`).children[props.defCheck].querySelector("input").checked = true}:{}
        return this.radio;
    }
}