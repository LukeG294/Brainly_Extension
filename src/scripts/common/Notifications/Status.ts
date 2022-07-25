export default class Label{
    id:string;

    constructor(id:string){
        this.id = id;
    }
    Show(message:string, color:"indigo" | "blue" | "red",spin?:boolean, close?:boolean){
        if(!document.querySelector(`.displayMessage#${this.id}`)){
            document.querySelector("body").insertAdjacentHTML("afterbegin", /*html*/`
            <div class="sg-label sg-label--${color}-20 displayMessage" id = "${this.id}" style = "position: fixed;right: 0;bottom: 0;margin: 24px;z-index: 999;">
                ${spin ? "<div class='sg-spinner sg-spinner--gray-70 sg-spinner--small' style='height: 16px;width: 16px;'></div>" : ""}
                <div class="sg-text sg-text--text-black sg-text--small sg-text--bold sg-label__text tabMessage" style="margin-left: 8px;">${message}</div>
                ${close ? "<button class='sg-label__close-button' title='close' aria-label='close'><div class='sg-icon sg-icon--icon-black sg-icon--x16'><svg class='sg-icon__svg' role='img' aria-labelledby='title-close-ol41ed' focusable='false'><text id='title-close-ol41ed' hidden=''>close</text><use xlink:href='#icon-close' aria-hidden='true'></use></svg></div></button>":""}
            </div>`)
        }
        else{
            console.warn("Identifier Overlap, use the Update or Close method to edit existing element")
        }
    }
    Update(message:string){
        document.querySelector(`.displayMessage#${this.id} .tabMessage`).innerHTML = message;
    }
    Close(){
        document.querySelector(`.displayMessage#${this.id}`).remove();
    }
}