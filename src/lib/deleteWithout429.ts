import {Question, Answer} from "scripts/common/Content"
import Notify from "scripts/common/Notifications/Notify";

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
  async function deletefromId(id: string){
    if(type === "tasks"){
      let qObj = new Question()
      await qObj.Delete(
        id, 
        settings.reason, 
        settings.warn, 
        settings.takePts, 
        false
      )
    }
    if(type === "responses"){
      let aObj = new Answer()
      await aObj.Delete(
        id, 
        settings.reason, 
        settings.warn, 
        settings.takePts
      )
    }
  }
  if(typeof IdArr === "string"){
    deletefromId(IdArr)
  }else {
    let success = 0;
    let fail = 0;
    const chunkSize = 10;
    for (let i = 0; i < IdArr.length; i += chunkSize) {
      let chunk = IdArr.slice(i, i + chunkSize);

      chunk.forEach(async (element) => {
        try{
          deletefromId(element)
          itemSuccessFn(element);
          success += 1
        }catch(e){
          fail += 1
        }
      })
      //add a 2 second delay between each chunk
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    Notify.Flash(`${success} removed successfully, ${fail} deletions failed`, "info")
  }
}