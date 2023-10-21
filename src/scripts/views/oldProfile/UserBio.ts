import { extension_server_url, parseProfileLink } from "configs/config"

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
    let FoundCount;
    try{
        FoundCount = htmlDoc.querySelector("p[style = 'margin-top: 10px;']").innerHTML.split("b>")[4].replace(" ","")
    }catch(err){
        FoundCount = htmlDoc.querySelector("p[style = 'margin-top: 10px;']").innerHTML.split("b>")[2].replace(" ","")
    }

    element.insertAdjacentHTML("afterbegin", `<span class="fright">Comments: <a target="_blank" href="/users/user_content/${id}/comments_tr">${FoundCount}</a></span><br>`)
}
let noteHTML = `
<textarea style="flex: 1; width:100%;" placeholder="Add a short note..." class=" profile-links sg-textarea sg-textarea--tall" data-form-type="other"></textarea>
`
export async function personal_notes(){
    if (!window.location.href.includes("/users/view")){
        let NotedId = parseProfileLink(window.location.href)
        let me = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
        let {id} = me.data.user
        let prevNote = null
        try {
            prevNote = await fetch(`${extension_server_url()}/get_user/${id}/notes/${NotedId}`).then(data => data.json())
        }catch(err){
            prevNote = {"note":""}
        }
        let notes_area = document.getElementById("main-right")
        notes_area.insertAdjacentHTML("afterbegin",noteHTML)
        let timeout = null;
        let textBox = notes_area.querySelector(".profile-links")
        //@ts-ignore
        textBox.value = prevNote.note
        textBox.addEventListener('keyup', function (e) {
            // Clear the timeout if it has already been set.
            // This will prevent the previous task from executing
            // if it has been less than <MILLISECONDS>
            clearTimeout(timeout);

            // Make a new timeout set to go off in 1000ms (1 second)
            timeout = setTimeout(async function () {
                //@ts-ignore
                chrome.runtime.sendMessage({ data: {"id":id,"notedId":NotedId,"newNote":textBox.value}, message:"edit_note" }, function () {});
            }, 100);
        });
        
    }
}