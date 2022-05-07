import {get_bio} from "../../common/common_functions"

export async function insert_bio(){
    
    //@ts-expect-error
    let userId = document.querySelector("[rel=canonical]").href.split("/")[4].split("-")[1]
    let bio = await get_bio(userId)
    document.querySelectorAll(".header")[3].insertAdjacentHTML("afterend", `<div class="bio-container">
    ${bio}
    </div>`)
    
}
