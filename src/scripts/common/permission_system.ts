export function getPermissions(){
 
    var jsonRanks;
    fetch("https://brainly.com/api/28/api_config/desktop_view")
    .then(response => response.text())
    .then(result => jsonRanks = result)
    .catch(error => console.log('error', error));

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
    let permissions = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 18:0, 82:0, 78:0, 70:0, 65:0, 40:0,81:1, 73:1, 12:1, 66:1, 69:2, 10:3, 9:4, 56:5, 55:6, 13:7, 62:7, 8:7}

    var obj;
    fetch("https://brainly.com/api/28/api_users/me")
    .then(response => response.json())
    .then(result => obj = result["data"]["user"]["ranks_ids"])
    .catch(error => console.log('error', error));

    let userTypes = []
    for (let index = 0; index < obj.length; index++) {
        let rankID = obj[index]
        userTypes.push(permissions[rankID])
    
    }

    return Math.max(...userTypes)

}