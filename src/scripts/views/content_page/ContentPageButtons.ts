import Form from "scripts/Items/Form"
import Components from "scripts/Items/Components"
import {
    insert_ticket
} from "../../common/ModFunctions"
import Extension from "../../../locales/en/localization.json"

export function deletion_menu() {
    return ( /*html*/ `
    <div class="delmenu">
              <div class="primary-items"></div>
              <div class="secondary-items"></div>
              <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
              <div class="sg-space-x-m del-options">
                <div class="warnpts">
                  ${
                    Form.Checkbox({
                      id: "pts",
                      text: Extension.buttons.takePoints
                    }).outerHTML
                  }
                  ${
                    Form.Checkbox({
                      id: "res-pts",
                      text: "Take back Respondents' Points"
                    }).outerHTML
                  }
                  ${
                    Form.Checkbox({
                      id: "warn",
                      text:Extension.buttons.warnUser
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
export function RenderItems(items){
  items.forEach((row, index) => {
    document.querySelector(".content").insertAdjacentHTML("beforeend", /*html*/`
    <div class="content-row num${String(index)}">
        <div class="sg-spinner-container__overlay">
          <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
        </div>
        ${
            Form.Checkbox({
            id: `checkbox-${index}`,
            classes: ["contentCheckboxes"],
            Attributes: [{
                key: "onclick",
                value: `document.querySelector('#checkbox-${index}').closest('.content-row').classList.toggle('selected')`
            }]
        }).outerHTML
        }

        <div class="num">${index + 1}</div>

        ${
            Components.Button({
                size: "s",
                type: "solid",
                icon: "shield",
                iconSize:"16",
                ClassNames: ["modticket", "mod"+String(index)]
            }).outerHTML
        }
        <div class="content-text">${row.content}</div>
        <div class="subject">
            <svg
                class="sg-subject-icon"
                aria-labelledby="sg-math-symbol-icon-${row.subject.toLowerCase()}-title"
                role="img"
                >
                <text id="sg-math-symbol-icon-${row.subject.toLowerCase()}-title" hidden="">
                    ${row.subject.toLowerCase()}
                </text>
                <use xlink:href="#icon-subject-${row.subject.toLowerCase()}" aria-hidden="true"></use>
            </svg>
        </div>
        <div class="date">${row.date}</div>
    </div>
    `)
    document.querySelector(".modticket." + "mod" + String(index)).addEventListener("click", () => {
        insert_ticket(
            row.content.split("/question/")[1].split('">')[0], 
            document.querySelector(".num" + String(index))
        )
    })
  })
}