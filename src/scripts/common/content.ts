import BrainlyAPI from "./BrainlyAPI"

export class Answer{
    Confirm(id:number){
        let AcceptBody = JSON.stringify({
                "operationName": "AcceptModerationReportContent",
                "variables": {
                "input": {
                    "contentType": "Answer",
                    "contentId": id
                }
                },
                "query": "mutation AcceptModerationReportContent($input: AcceptModerationReportContentInput!) {\n  acceptModerationReportContent(input: $input) {\n    validationErrors {\n      error\n      __typename\n    }\n    __typename\n  }\n}\n"
            })
        BrainlyAPI.GQL(AcceptBody);
    }
    Approve(id:string){
          BrainlyAPI.Legacy(`POST`, "api_content_quality/confirm", JSON.stringify({
            "model_type": 2,
            "model_id": id
          }));
    }

    async Delete(id:string, reason:string, warn:boolean, take_point:boolean){
        BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_response_content', JSON.stringify({
            "reason_id":2,
            "reason":reason,
            "give_warning":warn,
            "take_points": take_point,
            "schema":`moderation.response.delete`,
            "model_type_id":2,
            "model_id":id,
          }))
        }
}

export class Question{
    Confirm(id:number) {
        BrainlyAPI.Legacy(`POST`, "api_content_quality/confirm", JSON.stringify({
            "model_type_id":1,
            "model_id":id,
            "schema":"moderation.content.ok"
        }))
    }

    async Delete(id:string, reason:string, warn:boolean, take_point:boolean){
        BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_task_content', JSON.stringify({
            "reason_id":2,
            "reason":reason,
            "give_warning":warn,
            "take_points": take_point,
            "schema":`moderation.tasm.delete`,
            "model_type_id":1,
            "model_id":id,
          }))
    }
}