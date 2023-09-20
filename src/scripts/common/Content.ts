import BrainlyAPI from "./BrainlyAPI"
import {getCookie} from "./CommonFunctions"

export class Answer{
    async Confirm(id:number){
        let cookie = getCookie("Zadanepl_cookie[Token][Long]")
        chrome.runtime.sendMessage({ data: {"id":id,"cookie":cookie}, message:"confirm" }, function () {});
       
    }
    async Approve(id:string){
          await BrainlyAPI.Legacy(`POST`, "api_content_quality/confirm", {
            "model_type": 2,
            "model_id": id
          });
    }
    async Unapprove(id:string){
        let x = await fetch("https://brainly.com/api/28/api_content_quality/unconfirm", {
            method: "POST",
            body: JSON.stringify({
                "model_type": 2,
                "model_id": id
            })
        }).then(data => data.json());
        return x
    }
    async Delete(id:string, reason:string, warn:boolean, take_point:boolean){
        fetch('https://brainly.com/api/28/moderation_new/delete_response_content', {
            method: "POST",
            body: JSON.stringify({
            "reason_id":2,
            "reason":reason,
            "give_warning":warn,
            "take_points": take_point,
            "schema":`moderation.response.delete`,
            "model_type_id":2,
            "model_id":id,
            })
          }).then(data => data.json())
    }
    async AllowCorrection(reason:string, answerID:string){
        await BrainlyAPI.Legacy(`POST`, 'moderation_new/wrong_report', {
            "model_id":answerID,
            "model_type_id":2,
            "reason": reason,
            "schema": "",
        })
    }
}

export class Question{
    Confirm(id:number) {
        BrainlyAPI.Legacy(`POST`, "moderation_new/accept", {
            "model_type_id":1,
            "model_id":id,
            "schema":""
        })
    }

    async Delete(id:string, reason:string, warn:boolean, take_point:boolean, give_points:boolean){
        await BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_task_content', {
            "reason_id":2,
            "reason":reason, //deletion reason
            "give_warning":warn,
            "take_points": take_point, //asker's points
            "schema":`moderation.task.delete`,
            "model_type_id":1,
            "model_id":id, //question id
            "give_points": give_points //respondent's points
          })
    }
    async Get(id:string){
        let data = await BrainlyAPI.Legacy(`POST`, 'moderation_new/get_content', {
            "model_id":id,
            "model_type_id":1,
            "schema": "moderation.content.get",
        })
        await BrainlyAPI.Legacy(`POST`, 'moderate_tickets/expire', {
            "model_id":id,
            "model_type_id":1,
            "schema": "moderation.ticket.expire",
        })
        return data
    }
    async DeleteAttachment(taskID:string, attachmentID:string){
        await BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_attachment', {
            "task_id":taskID,
            "attachment_id":attachmentID,
            "model_id": taskID,
            "model_type_id": 1,
            "schema": "moderation.attachment.delete.req",
        })
    }
}

export class CommentHandler{
    async Delete(id:string, reason:string, warn:boolean){
      
        try {
            let resp = await BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_comment_content', {
            "reason_id":34,
            "reason":reason,
            "give_warning":warn,
            "model_type_id":45,
            "model_id":id,
            })
            return resp
   
        } catch(err){
            if (String(err).includes('another moderator')){
                return {'error':"reserved"}
            } else if (String(err).includes('no such')){
                return {'error':"cached"}
            }
            
        }
       
    }
    async GetAllReported(last_id:string){
        let response = await BrainlyAPI.Legacy(`POST`, 'moderation_new/get_comments_content', {
            "subject_id":0,
            "category_id":998,
            "schema":"moderation.index",
            "last_id":last_id
            
          })
        return response
        
    }
    async GetFirstReported(){
        let response = await BrainlyAPI.Legacy(`POST`, 'moderation_new/get_comments_content', {
            "subject_id":0,
            "category_id":998,
            "schema":"moderation.index"
            
            
          })
        return response
    }
    async Confirm(id:string){
        let response = await BrainlyAPI.Legacy(`POST`, 'moderation_new/accept', {
            "model_id":id,
            "model_type_id":45,
            "schema":""
          })
        return response
    }
}
