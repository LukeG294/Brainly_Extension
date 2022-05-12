import User from "../../common/User"

export async function insert_bio(){
    
    //@ts-expect-error
    let userId = document.querySelector("[rel=canonical]").href.split("/")[4].split("-")[1];
    let bio = await User.Get_Bio(userId)
   
    document.querySelectorAll(".header")[3].insertAdjacentHTML("afterend", `<div class="bio-container">
    ${bio}
    </div>`)
    
}
