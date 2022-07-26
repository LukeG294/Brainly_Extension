let id = window.location.href.split('/')[4].split("-")[1]
export async function AnswerLink(){
    let element = document.querySelector(".mod-profile-panel .fright:nth-child(2) span")
    element.outerHTML = `<a target=_blank href='/users/user_content/${id}/responses'>${element.innerHTML}</a>`
}
export async function QuestionCount(){
    let count = document.getElementById('profile-mod-panel').children[1].children[2].children[0].innerHTML
    let element = document.querySelector('.mod-profile-panel')

    element.insertAdjacentHTML("afterbegin", `<span class="fright">Questions asked: <a target="_blank" href="/users/user_content/${id}/tasks">${count}</a></span><br>`)
}
export async function CommentCount(){
    let count = await fetch('https://brainly.com/users/user_content/'+id+'/comments_tr').then(data => data.text())
    var parser = new DOMParser();
    let element = document.querySelector('.mod-profile-panel')
    var htmlDoc = parser.parseFromString(count, 'text/html');
    let FoundCount = htmlDoc.querySelector("#content-old > div:nth-child(3) > p").innerHTML.split("b>")[4].replace(" ","")

    element.insertAdjacentHTML("afterbegin", `<span class="fright">Comments: <a target="_blank" href="/users/user_content/${id}/comments_tr">${FoundCount}</a></span><br>`)
}
