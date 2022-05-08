import {User} from "../../common/user"

export async function insert_bio(){
    
    //@ts-expect-error
    let userId = document.querySelector("[rel=canonical]").href.split("/")[4].split("-")[1]
    let user = new User();
    let bio = await user.Get_Bio(userId)
   
    document.querySelectorAll(".header")[3].insertAdjacentHTML("afterend", `<div class="bio-container">
    ${bio}
    </div>`)
    
}
