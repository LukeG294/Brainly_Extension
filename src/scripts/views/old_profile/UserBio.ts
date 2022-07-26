import User from "../../common/User"

let id = window.location.href.split('/')[4].split("-")[1]
export async function AnswerLink(){
    let element = document.querySelector('.mod-profile-panel').children[3].children[0]
   
    element.outerHTML = `<a target=_blank href='/users/user_content/${id}/responses'>${element.innerHTML}</a>`
}
export async function QuestionCount(){
    let count = document.getElementById('profile-mod-panel').children[1].children[2].children[0].innerHTML
    let element = document.querySelector('.mod-profile-panel')
    let fright = document.createElement('div')
    element.prepend(fright)
    fright.outerHTML = `<span class="fright">Questions asked: <a target="_blank" href="/users/user_content/${id}/tasks">${count}</a></span><br>`
}
export async function CommentCount(){
    let count = await fetch('https://brainly.com/users/user_content/'+id+'/comments_tr')
    var parser = new DOMParser();
    let element = document.querySelector('.mod-profile-panel')
    var htmlDoc = parser.parseFromString(await count.text(), 'text/html');
    let FoundCount = htmlDoc.querySelector("#content-old > div:nth-child(3) > p").innerHTML.split("b>")[4].replace(" ","")
    let fright = document.createElement('div')
    element.prepend(fright)
    fright.outerHTML = `<span class="fright">Comments: <a target="_blank" href="/users/user_content/${id}/tasks">${FoundCount}</a></span><br>`
   
   
}
