import User from "scripts/common/User"
import Components from "scripts/Items/Components"

async function runSearch(){
    document.querySelector(".sg-flex.sg-flex--column.js-above-feed-ask-question .content").innerHTML = '<div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div></div>'
    document.querySelector(".content .spinner-container").classList.add("show")
    let result = await User.Search((<HTMLInputElement>document.querySelector(".userSearch")).value)
    document.querySelector(".content .spinner-container").classList.remove("show")
    console.log(result)
    let itemNum;
    if(result.length > 4){itemNum = 4}else{itemNum = result.length}
    for(let i = 0; i < itemNum; i++){
        document.querySelector(".content").insertAdjacentHTML("beforeend", userItem(result[i]))
    }
}
function UserSearchTool(){
    document.querySelector(".sg-flex.sg-flex--column.js-above-feed-ask-question").innerHTML = /*html*/`
        <div class="sg-search">
            <input type="search" placeholder="Look for users..." class="sg-input sg-input--with-icon sg-search__input userSearch">
                <button class="sg-search__icon user-search-but">
                        <div class="sg-icon sg-icon--gray-secondary sg-icon--x16"><svg class="sg-icon__svg">
                            <use xlink:href="#icon-search"></use>
                          </svg></div>
                </button>
        </div>
        <div class="content">
            <div class="spinner-container">
                <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
            </div>
        </div>
    `
    document.querySelector(".user-search-but").addEventListener("click",() => {
        runSearch()
    })
    document.querySelector(".userSearch").addEventListener("keyup", (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            runSearch()
        }
    })
}
function userItem(props:{
    name:string,
    link:string,
    pfp:string,
    friend:boolean,
    rank?:{
        name:string,
        color:string
    }
}){
    let friendIcon = props.friend ? "_checked" : "_add" 
    return (/*html*/`
        <a class="search-user" href = ${props.link} target = "_blank">
            <div class="udata">
                <div class="user-pfp sg-avatar sg-avatar--spaced">
                    ${props.pfp}
                </div>
                <div class="user-info">
                    <div class="username">${props.name}</div>
                    ${props.rank ? `<div class="rank" style = "color: ${props.rank.color}">${props.rank.name}</div>`:``}
                </div>
            </div>
            <div class="friendopt">
                ${
                    Components.Button({
                        size: "m",
                        type: "transparent",
                        icon: `friend${friendIcon}`,
                        iconSize: "24"
                    }).outerHTML
                }
            </div>
        </a>
    `
    )
}
export default function userSearch(){
    var sheet = window.document.styleSheets[0];
    sheet.insertRule('.sg-flex.sg-flex--column.js-above-feed-ask-question > .sg-flex { display: none; }', sheet.cssRules.length);
    
    let target = document.querySelector(".sg-layout__container");
    console.log(target)
    if(!target){ return setTimeout(userSearch, 10); }
    UserSearchTool()
}
userSearch()