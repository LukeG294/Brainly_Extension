import User from "../../common/User"

export async function insert_bio(){
    
    //@ts-expect-error
    let userId = document.querySelector("[rel=canonical]").href.split("/")[4].split("-")[1];
    let bio = await User.Get_Bio(userId)
   
    document.querySelectorAll(".header")[3].insertAdjacentHTML("afterend", `<div class="bio-container">
    ${bio}
    </div>`)
    
}
let id = window.location.href.split('/')[4].split("-")[1]
export async function add_answer_link(){
    let element = document.querySelector('.mod-profile-panel').children[3].children[0]
   
    element.outerHTML = `<a target=_blank href='/users/user_content/${id}/responses'>${element.innerHTML}</a>`
}
export async function add_question_count(){
    let count = document.getElementById('profile-mod-panel').children[1].children[2].children[0].innerHTML
    let element = document.querySelector('.mod-profile-panel')
    let fright = document.createElement('div')
    element.prepend(fright)
    fright.outerHTML = `<span class="fright">Questions asked: <a target="_blank" href="/users/user_content/${id}/tasks">${count}</a></span><br>`
}
export async function add_comment_count(){
    let count = await fetch('https://brainly.com/users/user_content/'+id+'/comments_tr')
    var parser = new DOMParser();
    let element = document.querySelector('.mod-profile-panel')
    var htmlDoc = parser.parseFromString(await count.text(), 'text/html');
    let FoundCount = htmlDoc.querySelector("#content-old > div:nth-child(3) > p").innerHTML.split("b>")[4].replace(" ","")
    let fright = document.createElement('div')
    element.prepend(fright)
    fright.outerHTML = `<span class="fright">Comments: <a target="_blank" href="/users/user_content/${id}/tasks">${FoundCount}</a></span><br>`
   
   
}
