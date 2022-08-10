import Ryver from "scripts/common/Ryver/Ryver";
import Notify from "scripts/common/Notifications/Notify"
import Status from "scripts/common/Notifications/Status"
import Form from "scripts/Items/Form"
import Components from "scripts/Items/Components"

export function reqMD(props: {id:string, element:Element,button:Element , type: "mod" | "answerer", position: "beforeend" | "afterbegin"}){
    let path = ""
    props.element.insertAdjacentElement(props.position, props.button)
    document.querySelector(".reqMD").addEventListener("click", () => {
        document.body.insertAdjacentHTML("beforeend", /*html*/`
            <div class="modal_back">
                <div class="modal-reqMd">
                    <div class = "modal_close" onclick = "document.querySelector('.modal_back').remove()">
                        <div class="sg-icon sg-icon--dark sg-icon--x32">
                            <svg class="sg-icon__svg"><use xlink:href="#icon-close"></use></svg>
                        </div>
                    </div>
                    <h2 class="sg-text sg-text--large sg-text--gray sg-text--bold">
                        Request MD
                    </h2>
                    <textarea placeholder="Reason" class="sg-textarea mdreq"></textarea>
                    ${
                        Form.RadioGroup({
                            ClassName: ["md-selection"],
                            id: "md-selection",
                            type: "row",
                            items: [
                                {
                                    id: "1",
                                    text: "Answers",
                                    value: "/responses"
                                },
                                {
                                    id: "2",
                                    text: "Questions",
                                    value: "/tasks"
                                },
                                {
                                    id: "3",
                                    text: "Comments",
                                    value: "/comments_tr"
                                },
                            ],
                            LookFor: {
                                id: "id",
                                name: "text"
                            }
                        }).outerHTML
                    }
                    ${
                        Components.Button({
                            size: "m",
                            ClassNames: ["submit-md"],
                            type: "solid",
                            text: "send request"
                        }).outerHTML
                    }
                </div>
            </div>
        `)
        document.querySelector(".md-selection").addEventListener("change", () => {
            path = document.querySelector(".md-selection input:checked").getAttribute("value")
        })
        document.querySelector(".submit-md").addEventListener("click", async () => {
            let reason = (<HTMLInputElement>document.querySelector(".mdreq")).value;
            let mdStat = new Status("md")
            document.querySelector(".modal_back").remove()
            mdStat.Show("Sending MD request...", "blue", true, false)
            if(props.type === "mod"){
                await Ryver.Message("1197733", `#requestmd https://brainly.com/users/user_content/${props.id}${path} ${reason}`, "workrooms", true)
            }else{
                await Ryver.Message("1197800", `#requestmd https://brainly.com/users/user_content/${props.id}${path} ${reason}`, "forums", true)
            }
            mdStat.Close()
            Notify.Flash("MD Request Sent Successfully!", "success")
        })
    })
}