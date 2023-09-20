import {Question, Answer} from "scripts/common/Content"
import Notify from "scripts/common/Notifications/Notify";
import Status from "scripts/common/Notifications/Status";

export default async function deleteWithout429(
    IdArr: string[] | string,
    type: "tasks" | "responses",
    settings: {
        warn: boolean,
        takePts: boolean,
        reason: string
    },
    itemSuccessFn?: (element) => void
){
  let stat = new Status("del");
  stat.Show("Removing Content...", "blue", true, false)
  async function deletefromId(id: string, fail?){
    if(type === "tasks"){
      let qObj = new Question()
      await qObj.Delete(
        id, 
        settings.reason, 
        settings.warn, 
        settings.takePts, 
        false
      ).catch(err => { fail += 1 })
    }
    if(type === "responses"){
      let aObj = new Answer()
      await aObj.Delete(
        id, 
        settings.reason, 
        settings.warn, 
        settings.takePts
      ).catch(err => fail += 1)
    }
  }
  if(typeof IdArr === "string"){
    deletefromId(IdArr)
  }else {
    let fail = 0;
    const chunkSize = 10;
    for (let i = 0; i < IdArr.length; i += chunkSize) {
      let chunk = IdArr.slice(i, i + chunkSize);

      chunk.forEach(async (element) => {
        deletefromId(element, fail)
        itemSuccessFn(element);
      })
      //add a 2 second delay between each chunk
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    stat.Close()
    Notify.Flash(`Content removed successfully`, "success")
  }
}