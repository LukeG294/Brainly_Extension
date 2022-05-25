import BasicFn from "./BasicFn";
import ModFn from "./ModFn"

export default class Panel{
    buttonArea;
    userId;
    constructor(){
        this.userId = (<string>window.location.href).replace("https://brainly.com/users/user_content/","").split("/")[0];
        document.querySelector("#content-old > div:nth-child(3)").insertAdjacentHTML("beforeend", '<div class = "mass-actions">');
        this.buttonArea = document.querySelector(".mass-actions") 
    }

    Basic(){
        BasicFn.addticket();
        BasicFn.checkboxes();
        BasicFn.copyLinks(this.buttonArea);
        BasicFn.toggleSelection(this.buttonArea);
        BasicFn.selectAll(this.buttonArea);
    }
    Ans(){
        ModFn.delete(this.buttonArea, "answers");
        ModFn.approveAnswers(this.buttonArea);
        ModFn.confirmAnswers(this.buttonArea);
        ModFn.unverifyAnswers(this.buttonArea);
        ModFn.find_reported_content(this.userId, "response", this.buttonArea);
    }
    Ques(){
        ModFn.delete(this.buttonArea, "questions")
        ModFn.confirmQuestions(this.buttonArea);
        ModFn.find_reported_content(this.userId, "task", this.buttonArea);
    }
}
