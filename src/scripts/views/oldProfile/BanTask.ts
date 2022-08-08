import Ryver from "scripts/common/Ryver/Ryver";
import Notify from "scripts/common/Notifications/Notify"

async function ryverTask(id:string){
    let data = await Ryver.getBoardTasks("1197733")
    data = data.d.categories.results[1].tasks.results

    for(let i = 0; i < data.length; i++){
        if(data[i].body.includes(id)){
            return console.log("Task found")
        }else{
            return Notify.Flash("task not found", "error")
        }
    }
}