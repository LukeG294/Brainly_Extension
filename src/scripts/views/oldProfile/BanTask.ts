import Ryver from "scripts/common/Ryver/Ryver";
import Notify from "scripts/common/Notifications/Notify"
import Status from "scripts/common/Notifications/Status"
import Components from "scripts/Items/Components"

export async function ryverTask(id:string){
    let data = await Ryver.getBoardTasks("1197733")
    //@ts-ignore
    data = data.d.categories.results[1].tasks.results
    //@ts-ignore
    for(let i = 0; i < data.length; i++){
        if(data[i].body.includes(id)){
            return console.log("Task found")
        }
    }
    taskButton()
}

function taskButton(){
    document.querySelector(".modMenu").insertAdjacentElement("afterbegin", 
        Components.Button({
            size: "m",
            type: "solid",
            ClassNames: ["banTask"],
            icon: "bulleted_list",
            iconSize: "16"
        })
    )
    document.querySelector(".banTask").addEventListener("click", () => {
        Notify.Dialog("Ban Task", "are you sure you want to create a ban task for this user?", 
        confirmBanTask, 
        true)
    })
}
async function confirmBanTask(){
    let taskStat = new Status("task")
    taskStat.Show("Creating the task...", "blue", true, false)
    let id = (<string>window.location.href).split("-")[1].split("/")[0]
    let username = document.querySelector(".info_top > span.ranking > h2 > a").innerHTML;
    let warncount = parseInt(document.querySelector(".mod-profile-panel > span:nth-child(8) > span > a").innerHTML);
    let bancount = parseInt(document.querySelector("#main-left > div.personal_info > div.mod-profile-panel > span:nth-child(10) > span").innerHTML);
    let title = `${username} ${warncount ? '| ' + String(warncount) + " Active Warnings": ''} ${bancount ? '| ' + String(bancount) + ' Bans' : ''}`
    await Ryver.Task(
        title,
        `https://brainly.com/users/view_user_warns/${id}\nhttps://brainly.com/profile/${username}-${id} `,
        1026940,
        1384108,
        true
    )
    window.location.reload()
}