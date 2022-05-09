import BrainlyAPI from "./BrainlyAPI"
import {getCookie} from "./CommonFunctions"

export class User{
    async Delete(uid:string){
        await fetch("https://brainly.com/admin/users/delete/"+uid, {
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1"
        }
        });
    }
    async Warnings(user:string){
        let warn_arr = [];
        let txt = await fetch("https://brainly.com/users/view_user_warns/" + user).then(data => data.text());
        let parser = new DOMParser();
        let warnPage = parser.parseFromString(txt, 'text/html');
        let warns = warnPage.querySelectorAll("#content-old tr");
        for(let i=1;i< warns.length; i++){
            let row = warns[i];
            var this_warn = {
                date: row.children[0].innerHTML,
                reason: row.children[1].innerHTML,
                content: row.children[2].innerHTML,
                moderator: row.children[4].children[0].innerHTML,
                isRevoked: row.children[5].children[0].innerHTML !== "Undo"
            }
            warn_arr.push(this_warn);
        }
        return warn_arr
    }
    async Data(id:string){
        return await BrainlyAPI.GQL(`
            query {
                userById(id: ${id}) {
                    nick
                    avatar{
                        url
                    }
                }
            }`
        )
    }
    async Get_Bio(id:number){
        return await (await BrainlyAPI.GetUser(id)).data.description;
    }
}