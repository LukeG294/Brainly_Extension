import Status from "scripts/common/Notifications/Status";

export default async function allPages(
    message: string,
    type: "tasks" | "responses",
    itemFn: (resp) => void
){
    let stat = new Status("fetch");
    let id = window.location.href.replace("https://brainly.com/users/user_content/", "").split("/")[0];
    let pagenum = document.querySelector("#content-old > div:nth-child(3) > p").children.length-2;
    
    stat.Show(message+"...", "indigo", true)
    for(let p=1; p<pagenum; p++){
        let content = await fetch(`https://brainly.com/users/user_content/${id}/${type}/${p}/0`).then(data => data.text())
        //@ts-ignore
        let responseHTML = new DOMParser().parseFromString(content, "text/html")

        if(!responseHTML.querySelector(".border-error")){ 
            let content =  responseHTML.querySelector("tbody").children;
            for (let i = 0; i < content.length; i++) {
                let contentlink = content[i]
                let qid = contentlink.querySelector("a").href.replace("https://brainly.com/question/", "");
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let resp = JSON.parse(this.responseText);
                        itemFn(resp);
                    }
                };
                xhttp.open("POST", `https://brainly.com/api/28/api_tasks/main_view/${qid}`);
                xhttp.send();
            }
        }
        stat.Update(`${message}... (page ${p} of ${pagenum})`)
    }
} 