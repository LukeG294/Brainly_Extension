import User from "scripts/common/User"
import Components from "scripts/Items/Components"

async function runSearch(){
  
   
    let result = await User.Search((<HTMLInputElement>document.querySelector(".userSearch")).value)
    
    let itemNum = result.length > 4 ? 4 : result.length;
    document.querySelector(".content").innerHTML = ``
    for(let i = 0; i < itemNum; i++){
        document.querySelector(".content").insertAdjacentHTML("beforeend", userItem(result[i]))
    }
}
function UserSearchTool(){
    document.querySelector('.brn-moderation-panel__list').insertAdjacentHTML("beforeend", /*html*/`
        <div class="sg-search">
            <input type="search" placeholder="Look for users..." class="sg-input sg-input--with-icon sg-search__input userSearch">
                <button class="sg-search__icon user-search-but">
                        
                </button>
        </div>
        <div class="content">
            <div class="spinner-container">
                <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
            </div>
        </div>
    `)
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
           
        </a>
    `
    )
}
export default function userSearch(){

    var sheet = window.document.styleSheets[0];
    sheet.insertRule('.sg-flex.sg-flex--column.js-above-feed-ask-question > .sg-flex { display: none; }', sheet.cssRules.length);
    
    let target = document.querySelector(".brn-moderation-panel__content");
   
    if(!target){ return setTimeout(userSearch, 10); }
    UserSearchTool()
}
