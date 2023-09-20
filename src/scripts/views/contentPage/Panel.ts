import BasicFn from "./BasicFn";
import ModFn from "./ModFn"

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
    Ans(){
       
            ModFn.delete(this.buttonArea, "responses");
            ModFn.approveAnswers(this.buttonArea);
            ModFn.confirmAnswers(this.buttonArea);
            ModFn.afc(this.buttonArea);
            
            ModFn.unverifyAnswers(this.buttonArea);
            //ModFn.find_reported_content(this.userId, "responses", this.buttonArea);
        
       // ModFn.approveAll(this.buttonArea);
    }
    Ques(){
        ModFn.delete(this.buttonArea, "tasks")
        ModFn.confirmQuestions(this.buttonArea);
       //ModFn.find_reported_content(this.userId, "tasks", this.buttonArea);
    }
    
}
