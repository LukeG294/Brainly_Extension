import BasicFn from "./BasicFn";
import ModFn from "./ModFn"

export default new class Panel{

    Basic(){
        BasicFn.copyLinks();
        BasicFn.selectAll();
        BasicFn.toggleSelection();
        BasicFn.addticket();
    }
    Ans(){
        ModFn.approveAnswers();
        ModFn.confirmAnswers();
        ModFn.find_reported_content(window.location.href.split("-")[1].split("/")[0], "response");
    }
    Ques(){
        ModFn.confirmQuestions();
        ModFn.find_reported_content(window.location.href.split("-")[1].split("/")[0], "task");
    }
}