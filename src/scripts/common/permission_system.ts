export async function getPermissions(){
         
        /*

        7 - Admins
        6 - Supers
        5 - Seniors
        4 - Fulls
        3 - Juniors
        2 - Part-Time Mods
        1 - Answerers
        0 - None found

        */
        
        let permissions = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 18:0, 82:0, 78:0, 70:0, 65:0, 40:0, 81:1, 73:1, 12:1, 66:1, 69:2, 10:3, 9:4, 56:5, 55:6, 13:7, 62:7, 8:7}
        let txt = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json());
        let ranks = txt["data"]["user"]["ranks_ids"]
        let userTypes = []
        for (let index = 0; index < ranks.length; index++) {
            let rankID = ranks[index]
            userTypes.push(permissions[rankID])
        
        }

            return Math.max(...userTypes)
      
         
     

}

export async function get_warnings(user:string){
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
