import Form from "scripts/Items/Form"
import Components from "scripts/Items/Components"
import { insert_ticket } from "../../common/ModFunctions"
import BasicFn from "./BasicFn"
import Extension from "../../../locales/en/localization.json"

export function deletion_menu() {
  return ( /*html*/ `
    <div class="delmenu">
      <div class="primary-items"></div>
      <div class="secondary-items"></div>
      <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
      <div class="sg-space-x-m del-options">
        <div class="warnpts">
          ${Form.Checkbox({
              id: "pts",
              text: Extension.buttons.takePoints
          }).outerHTML
          }
          ${Form.Checkbox({
            id: "res-pts",
            text: "Take Back Respondents' Points"
          }).outerHTML
          }
          ${Form.Checkbox({
            id: "warn",
            text: Extension.buttons.warnUser
          }).outerHTML
          }
        </div>
        <div class="confirmdel">
        <button class="sg-button sg-button--m sg-button--outline" id="delete"> <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">${Extension.buttons.confirm}</span></button>
        </div>
      </div>
    </div>
    `)
}
export function RenderItems(items: {
  content: string,
  subject: string,
  date: string
}[]) {
  document.querySelector(".content-items").innerHTML = "";
  items.forEach((row, index) => {
    let id = row.content.split("/question/")[1].split('">')[0];
    let subjectIcon = row.subject.toLowerCase()
    if (subjectIcon === "social studies"){
      subjectIcon = "sociology"
    } else if (subjectIcon === "computers and technology"){
      subjectIcon = "informatics"
    } else if (subjectIcon === "world languages"){
      subjectIcon = "otherlanguages"
    } else if (subjectIcon === "artmusic"){
      subjectIcon = "art"
    } else if (subjectIcon === "medicine"){
      subjectIcon = "first-aid"
    } else if (subjectIcon === "engineering"){
      subjectIcon = "technology"
    } else if (subjectIcon === "advanced placement (ap)"){
      subjectIcon = "pedagogics"
    }
    document.querySelector(".content-items").insertAdjacentHTML("beforeend", /*html*/`
    <div class="content-row num${String(index)}">
        <div class="sg-spinner-container__overlay">
          <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
        </div>
        ${Form.Checkbox({
      id: `checkbox-${index}`,
      classes: ["contentCheckboxes"],
      Attributes: [{
        key: "onclick",
        value: `document.querySelector('#checkbox-${index}').closest('.content-row').classList.toggle('selected')`
      }]
    }).outerHTML
      }

        <div class="num">${index + 1}</div>
        
        ${Components.Button({
        size: "s",
        type: "solid",
        icon: "shield",
        iconSize: "16",
        ClassNames: ["modticket", "mod" + String(index)]
      }).outerHTML
      }
        <div class = "content-icons">
          <div class = "q-icons">
            ${Components.Icon("report_flag", "16").outerHTML
      }
            ${Components.Icon("attachment", "16").outerHTML
      }
          </div>
          <div class = "a-icons">
          ${Components.Icon("report_flag", "16").outerHTML
      }
            ${Components.Icon("attachment", "16").outerHTML
      }
            ${Components.Icon("verified", "16").outerHTML
      }
            ${Components.Icon("crown", "16").outerHTML
      }
     
          </div>
        </div>
        <div class="content-text">${row.content}</div>
        <div class="subject">
            <svg
                class="sg-subject-icon"
                aria-labelledby="sg-math-symbol-icon-${subjectIcon}-title"
                role="img"
                >
                <text id="sg-math-symbol-icon-${subjectIcon}-title" hidden="">
                    ${subjectIcon}
                </text>
                <use xlink:href="#icon-subject-${subjectIcon}" aria-hidden="true"></use>
            </svg>
        </div>
        <div class="date">${row.date}</div>
    </div>
    `)
    
   
    document.querySelector(".modticket." + "mod" + String(index)).addEventListener("click", () => {
      insert_ticket(
        id,
        document.querySelector(".num" + String(index))
      )
    })
  })
  let question = String(window.location.href).includes("tasks")
  BasicFn.addIcons(question)
}