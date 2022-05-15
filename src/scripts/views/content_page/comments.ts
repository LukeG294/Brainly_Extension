import {
    approve_selected,
    copy_links,
    delete_selected_comments,
    select_all,
    toggle_selected,
    unverify_selected
} from "./ContentPageButtons"

window.addEventListener("load", function() {
    function getPageType() {
        let type = String(window.location.href.split("/")[6])
        if (type === "tasks") {
            return "task"
        } else if (type === "responses") {
            return "response"
        } else if (type === "comments_tr") {
            return "comment"
        } else {
            return "task"
        }
    }
    let content = document.querySelectorAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")

    for (let i = 0; i < content.length; i++) {
        content[i].insertAdjacentHTML('beforeend', `<div class="sg-space-x-m"><label class="sg-checkbox" for="mmm41eh8ef8"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
     <div class="sg-checkbox__ghost" aria-hidden="true">
       <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
           <use xlink:href="#icon-check" aria-hidden="true"></use>
         </svg></div>
     </div>
   </label></div>`)
    }

    let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")
        //if you want to add permissions for each button later, do it here (below)



    // buttonArea.insertAdjacentHTML('afterend', delete_selected_comments())
    buttonArea.insertAdjacentHTML('afterend', copy_links())
    buttonArea.insertAdjacentHTML('afterend', toggle_selected())
    buttonArea.insertAdjacentHTML('afterend', select_all())
    document.getElementById("selectAll").addEventListener("click", function() {
        let checkBoxes = document.getElementsByClassName("contentCheckboxes")
        for (let i = 0; i < checkBoxes.length; i++) {
            // @ts-ignore
            checkBoxes[i].checked = 'true'
        }
    })
    document.getElementById("toggleSelected").addEventListener("click", function() {
        let checkBoxes = document.getElementsByClassName("contentCheckboxes")
        for (let i = 0; i < checkBoxes.length; i++) {

            //@ts-ignore
            if (String(checkBoxes[i].checked) === "true") {
                //@ts-ignore
                checkBoxes[i].checked = false
            } else {
                //@ts-ignore
                checkBoxes[i].checked = true
            }


        }
    })
    document.getElementById("copyLinks").addEventListener("click", function() {
        let checkBoxes = document.getElementsByClassName("sg-checkbox__element")
        let links = []
        for (let i = 0; i < checkBoxes.length; i++) {

            //@ts-ignore
            if (String(checkBoxes[i].checked) === "true") {
                links.push(checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href)
            }




        }
        let joinLinks = links.join("\n")
        navigator.clipboard.writeText(joinLinks)
            .then(() => {
                // Success!
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
        links = []
    })




})
