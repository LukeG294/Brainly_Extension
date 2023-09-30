
import BasicFn from "./BasicFn";
import ModFn from "./ModFn"
import { runCheck } from "../../../scripts/common/ModFunctions";
import { extension_server_url } from "configs/config";

export default class Panel{
    buttonArea;
    userId;
    constructor(){
        this.userId = (<string>window.location.href).replace("https://brainly.com/users/user_content/","").split("/")[0];
     
        this.buttonArea = document.querySelector("#content-old") 
    }
    
    Basic(){
        BasicFn.copyLinks(this.buttonArea);
        BasicFn.toggleSelection(this.buttonArea);
        BasicFn.selectAll(this.buttonArea);
    }
    async Ans(){
            let key = await fetch(`${extension_server_url()}/configs/feature_keys`).then(data => data.json())
            runCheck(ModFn.delete, key["selective_answer_deletion"], this.buttonArea, "responses")
            runCheck(ModFn.approveAnswers,key["selective_answer_approval"], this.buttonArea)
            runCheck(ModFn.confirmAnswers, key["selective_answer_confirmation"], this.buttonArea)
            runCheck(ModFn.afc, key["selective_answer_AFC"], this.buttonArea)
            runCheck(ModFn.unverifyAnswers, key["selective_answer_unverify"], this.buttonArea)
            
        
            //ModFn.find_reported_content(this.userId, "responses", this.buttonArea);
        
       // ModFn.approveAll(this.buttonArea);
    }
    async Ques(){
        let key = await fetch(`${extension_server_url()}/configs/feature_keys`).then(data => data.json())
        runCheck(ModFn.delete, key["selective_question_deletion"], this.buttonArea, "tasks")
        runCheck(ModFn.confirmQuestions, key["selective_question_confirmation"], this.buttonArea)
       
       //ModFn.find_reported_content(this.userId, "tasks", this.buttonArea);
    }
    
}
