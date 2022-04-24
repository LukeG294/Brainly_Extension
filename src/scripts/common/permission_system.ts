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

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let me = JSON.parse(this.responseText);
            let ranks = me["data"]["user"]["ranks_ids"]
            let userTypes = []
                for (let index = 0; index < ranks.length; index++) {
                    let rankID = ranks[index]
                    userTypes.push(permissions[rankID])
                
                }
        
                console.log(Math.max(...userTypes))
          }
        });
        
        xhr.open("GET", "https://brainly.com/api/28/api_users/me");
        
        xhr.send();

}
