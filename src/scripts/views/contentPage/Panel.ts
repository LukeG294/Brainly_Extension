import { get_feature_key_needed } from "configs/config";
import BasicFn from "./BasicFn";
import ModFn from "./ModFn"
import { runCheck } from "../../../scripts/common/ModFunctions";

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
            runCheck(ModFn.delete, await get_feature_key_needed("selective_answer_deletion"), this.buttonArea, "responses")
            runCheck(ModFn.approveAnswers, await get_feature_key_needed("selective_answer_approval"), this.buttonArea)
            runCheck(ModFn.confirmAnswers, await get_feature_key_needed("selective_answer_confirmation"), this.buttonArea)
            runCheck(ModFn.afc, await get_feature_key_needed("selective_answer_AFC"), this.buttonArea)
            runCheck(ModFn.unverifyAnswers, await get_feature_key_needed("selective_answer_unverify"), this.buttonArea)
            
        
            //ModFn.find_reported_content(this.userId, "responses", this.buttonArea);
        
       // ModFn.approveAll(this.buttonArea);
    }
    async Ques(){
        runCheck(ModFn.delete, await get_feature_key_needed("selective_question_deletion"), this.buttonArea, "tasks")
        runCheck(ModFn.confirmQuestions, await get_feature_key_needed("selective_question_confirmation"), this.buttonArea)
       
       //ModFn.find_reported_content(this.userId, "tasks", this.buttonArea);
    }
    
}
