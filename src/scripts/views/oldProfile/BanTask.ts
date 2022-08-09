import Ryver from "scripts/common/Ryver/Ryver";
import Notify from "scripts/common/Notifications/Notify"
import Components from "scripts/Items/Components"

export async function ryverTask(id:string){
    let data = await Ryver.getBoardTasks("1197733")
    data = data.d.categories.results[1].tasks.results

    for(let i = 0; i < data.length; i++){
        if(data[i].body.includes(id)){
            return console.log("Task found")
        }else{
            return taskButton()
        }
    }
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
    let id = (<string>window.location.href).split("-")[1].split("/")[0]
    await Ryver.Task(
        `${document.querySelector(".info_top > span.ranking > h2 > a").innerHTML} | ${document.querySelector(".mod-profile-panel > span:nth-child(8) > span > a").innerHTML} Warnings`,
        `https://brainly.com/users/view_user_warns/${id}`,
        1026940,
        1384108
    )
    window.location.reload()
}