import {showMessage} from "../common/common_functions"

export async function getPermissions(username,password){   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": username,
    "password": password
    });
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    };
    let txt = await fetch("https://th-extension.lukeg294.repl.co/login", requestOptions)
    .then(data => data.text())
    if (txt){
        let secret = JSON.parse(txt).secret.secret;
    
    let responseJSON = JSON.parse(txt)
    let documentID = responseJSON.secret.instance["@ref"].id
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("fauna-secret", secret);
    var request = {
      method: 'GET',
      headers: myHeaders,
    };
    let resp = await fetch("https://th-extension.lukeg294.repl.co/users/"+documentID,request).then(data => data.text());
    let permissionsResponseJSON = JSON.parse(resp)
    return permissionsResponseJSON["data"]["permissions"] 
    }
}


export async function checkPermissionSet(){
    let permsArr = []
    let userData = JSON.parse(document.querySelector('meta[name="user_data"]').getAttribute("content"))
    let perms = await getPermissions(userData.nick, userData.id)
    permsArr = String(atob(perms)).split(",")  
    return permsArr
}

export function checkUser(pageType, checkFunction){
    let userData;
    if(pageType === "new"){
        userData = JSON.parse(document.querySelector('meta[name="user_data"]').getAttribute("content"))
    }
    if(pageType === "old"){
        let data = document.querySelector(".show-all").getAttribute("href").split("/")[4].split("-")
        userData = {"nick":data[0], "id":data[1]}
    }
    var data = JSON.stringify({
      "username": userData.nick,
      "password": userData.id
    });
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        let response = JSON.parse(this.responseText);
        if (response.statusCode === 401){
          showMessage(`Error 401: We couldn't find a permission set for ${userData.nick} with the ID ${userData.id}. Please contact LukeG1 or TheSection for help authenticating.`,"error")
        } else {
           checkFunction()
        }
      }
    });
    
    xhr.open("POST", "https://th-extension.lukeg294.repl.co/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}
