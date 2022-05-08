
import{ permissionChecks } from "../homepage/exports"
import{  editUser, getPermissionsWithDocId} from "../../common/permissions/PermissionSystem"

export async function manage_user(){
    document.getElementById('main-right').insertAdjacentHTML('beforeend',`
    <div class="manage-user"><h2 class="sg-headline sg-headline--text-blue-40 sg-headline--medium">Manage Extension Permissions</h2></div>
    `)
    document.querySelector('.manage-user').addEventListener('click', async function(){
        if (!this.classList.contains('open')){
            this.classList.add("open")
            this.parentElement.insertAdjacentHTML('beforeend',`<div class="changePermissions">${permissionChecks()}</div>`)
            //@ts-expect-error
            let userDataProfilePage = document.querySelector('[rel=canonical]').href.split("/")[4].split("-")
            let prevPerms = await getPermissionsWithDocId(userDataProfilePage[0], userDataProfilePage[1])
            
              
                let decodedPerms = atob(prevPerms.split(",")[0]).split(",")
               
                for (let index = 0; index < decodedPerms.length; index++) {
                    const permsElement = decodedPerms[index];
                    let foundCheck = this.parentElement.querySelector(".changePermissions").querySelector(".perm"+permsElement)
                    foundCheck?foundCheck.checked = true:null;
                }
                document.querySelector(".submit-permissions").addEventListener("click", async function(){
                   
                    this.querySelector(".spinner-container").classList.add("show");

                    let perms = []
                    let userOptions = this.parentElement.querySelectorAll(".permission")
                    for (let index = 0; index < userOptions.length; index++) {
                        const element = userOptions[index];
                        if (element.children[0].checked){
                            perms.push(element.children[0].id)
                        }
                        
                    }
                    
                    await editUser(prevPerms.split(",")[1], perms)
                    this.querySelector(".spinner-container").classList.remove("show");
                })
                
            } else {
                let checks = document.querySelectorAll(".permission")
                for (let index = 0; index < checks.length; index++) {
                    const element = checks[index];
                    element.remove();
                }
                document.querySelector(".submit-permissions").remove()
                this.classList.remove("open")
              
               
            }
           
        
        

    })
}