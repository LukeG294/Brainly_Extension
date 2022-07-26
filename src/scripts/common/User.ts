import BrainlyAPI from "./BrainlyAPI"
import Extension from "../../locales/en/localization.json"

export default new class User{
    async Delete(uid:string){
        await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/admin/users/delete/`+uid, {
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
        let txt = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/users/view_user_warns/` + user).then(data => data.text());
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
    MdButton(id:string, type:string){
        return /*html*/`
            <form onsubmit="return confirm('Are you sure you want to continue:\n\nDelete ${type}');" id="AddForm" method="post" action="/admin/users/delete_${type}">
                <fieldset style="display:none;">
                    <input type="hidden" name="_method" value="POST">
                    <input type="hidden" name="data[_Token][key]" value="05f9abe6c1df13598c39a2a0b972817daa55827b" id="Token885673562">
                </fieldset>

                <input type="hidden" name="data[uid]" value=${id} id="uid">
                <input type="submit" class="onlylink" value="Delete ${type}">

                <fieldset style="display:none;">
                    <input type="hidden" name="data[_Token][fields]" value="eb65d6c972f557e5f1517750a0592cb46375f53b%3An%3A1%3A%7Bv%3A0%3Bf%3A3%3A%22hvq%22%3B%7D" id="TokenFields62231453">
                    <input type="hidden" name="data[_Token][lock]" value="_PHP603da1b527604e9c206770a9f19c7fd75f6dc8ed" id="TokenLocker62231453">
                </fieldset>
            </form>`
    }
}