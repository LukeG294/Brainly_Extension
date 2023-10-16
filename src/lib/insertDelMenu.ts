import Form from "scripts/Items/Form"
import deleteWithout429 from "./deleteWithout429";
import Status from "scripts/common/Notifications/Status"
import { extension_server_url } from "configs/config";

export default async function insertDelMenu(
  targetElem: HTMLElement, 
  type: "tasks" | "responses",
  contentIdFn: () => string[],
  reasonIds: () => string[],
  toggle: boolean,
  itemSuccessFn?: (element) => void
){
  if(!targetElem.querySelector(".delmenu")){
    let stat = new Status("del")
    stat.Show("Fetching Deletion Reasons...", "indigo", true, false)

    let reasons;
    for(let id of reasonIds()){
      try{
        reasons = await fetch('https://brainly.com/api/28/moderation_new/get_content', {
          method: "POST",
          body: (`{"model_type_id":1,"model_id":${ id },"schema":"moderation.content.get"}`)
        }).then(data => data.json())

        reasons = (type === "responses") ? reasons.data.delete_reasons.response : reasons.data.delete_reasons.task 
        stat.Close();
        fetch(`https://brainly.com/api/28/moderate_tickets/expire`, {
          method: "POST",
          body: `{"model_id":${ id },"model_type_id":1,"schema":"moderation.ticket.expire"}`
        });
        break
      }catch(err){}
    }

    targetElem.insertAdjacentHTML("beforeend", /*html*/`
      <div class="delmenu show">
        <div class="primary-items sg-radio-group sg-radio-group__items sg-radio-group__items--direction-row" role = "radiogroup"></div>
        <div class="secondary-items sg-radio-group sg-radio-group__items sg-radio-group__items--direction-row" role = "radiogroup"></div>
        <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
        <div class="sg-space-x-m del-options">
          <div class="warnpts">
            ${
              Form.Checkbox({ id: "pts", text: "take points" }).outerHTML
            }
            ${
              Form.Checkbox({ id: "res-pts", text: "take respondents' points" }).outerHTML
            }
            ${
              Form.Checkbox({ id: "warn", text: "warn user" }).outerHTML
            }
          </div>
          <div class="confirmdel">
            <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">confirm</span></button>
          </div>
        </div>
      </div>
    `)

    let elem = document.querySelector(".delmenu")
    elem.querySelector(".primary-items").outerHTML = Form.RadioGroup({
      ClassName: ["primary-items"],
      id: "primary",
      type: "row",
      items: reasons,
      LookFor: {
          name: "text",
          id: "id"
      }
  }).outerHTML
    //primary deletion reason listener
    elem.querySelector(".primary-items").addEventListener("change", async function(){
      elem.classList.add("secondary")
      //finds selected item and links it to the object
      let selected_index = elem.querySelector(".primary-items input:checked").getAttribute("index");
      let selected_subcats = reasons[selected_index].subcategories;

      //inserting secondary deletion reasons
      elem.querySelector(".secondary-items").outerHTML = Form.RadioGroup({
          ClassName: ["secondary-items"],
          id: "secondary",
          type: "row",
          items: selected_subcats,
          LookFor: {
              name: "title",
              id: "id"
          }
      }).outerHTML

      //adds listener to the subcategories
      elem.querySelector(".secondary-items").addEventListener("change", function(){
        let selected_reason = selected_subcats[elem.querySelector(".secondary-items input:checked").getAttribute("index")];
        
        (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value = selected_reason.text;
      });
      let reason_append = await fetch(`${extension_server_url()}/preset_messages/ext_action_note`).then(data => data.json())
      elem.querySelector(".confirmdel button").addEventListener("click", async function(){
        let warnuser = (<HTMLInputElement>elem.querySelector("input[id ^= 'warn']")).checked;
        let takepts = !(<HTMLInputElement>elem.querySelector("input[id ^= 'res-pts']")).checked;
        let reason = (<HTMLInputElement>elem.querySelector(".deletion-reason")).value
        
        let changedReason = reason + " " + reason_append[0].text
        await deleteWithout429(
          contentIdFn(),
          type,
          {
            warn: warnuser,
            takePts: takepts,
            reason: changedReason,
          },
          (element) => { itemSuccessFn(element) }
        )
      });
    });
  }else {
    if(toggle) targetElem.querySelector(".delmenu").classList.toggle("show")
  }
}