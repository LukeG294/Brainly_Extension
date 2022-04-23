import {addResponseButtons} from "./responses"
import {addTaskButtons} from "./tasks"
import {addticket} from "./button_functions"
import { add_icons } from "./content_page_buttons"

add_icons()
//tasks page
if(window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))){
    addTaskButtons()
    console.log("taskpage")
}

//responses page
if(window.location.href.includes("responses")){
    addResponseButtons()
}

//comments page
if(window.location.href.includes("comments_tr")){

}
addticket()