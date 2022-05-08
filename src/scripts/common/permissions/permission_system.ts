import {showMessage} from "../common_functions"

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
    let user = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
    let userData = user.data.user
    let perms = await getPermissions(userData.nick, userData.id)
    permsArr = String(atob(perms)).split(",")  
    return permsArr
}

// export async function checkUser(checkFunction, fallbackFn = () => {}){
//   let user = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
//   let userData = user.data.user
//     var data = JSON.stringify({
//       "username": userData.nick,
//       "password": userData.id
//     });
    
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
    
//     xhr.addEventListener("readystatechange", function() {
//       if(this.readyState === 4) {
//         let response = JSON.parse(this.responseText);
//         if (response.statusCode === 401){
//           showMessage(`Error 401: We couldn't find a permission set for ${userData.nick} with the ID ${userData.id}. Please contact LukeG1 or TheSection for help authenticating.`,"error")
//           fallbackFn()
//         } else {
//           checkFunction()
//         }
//       }
//     });
    
//     xhr.open("POST", "https://th-extension.lukeg294.repl.co/login");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(data);
// }
export async function removeUser(id){
  await fetch("https://th-extension.lukeg294.repl.co/users/"+id,{method: "DELETE"})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
export async function removeAnswer(id){
  await fetch("https://th-extension.lukeg294.repl.co/answers/"+id,{method: "DELETE"})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
export async function editUser(id, perms){
  var myHeaders = new Headers();
  myHeaders.append("fauna-secret", "fnEElJgAo3ACUgST2vKykApS_Vv7fmrdvkNhzuHKo3nGguNOiN4");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
      "permissions": btoa(perms)
  });

  var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  };

  await fetch("https://th-extension.lukeg294.repl.co/permissions/"+id, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
export async function addUser(profileLink){
  let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
  if (regexString.test(profileLink)) {
      let user = await fetch(profileLink).then(data => data.text());
      let parser = new DOMParser();
      let profilePage = parser.parseFromString(user, 'text/html');
      //@ts-ignore
      let avatar = profilePage.querySelector("#main-left > div.personal_info > div.header > div.avatar > a > img").src
      //@ts-ignore
      let username = profilePage.querySelector("#main-left > div.personal_info > div.header > div.info > div.info_top > span.ranking > h2 > a").innerText
      //@ts-ignore
      let id = profilePage.querySelector(".avatar").children[0].href.split("/")[4].split("-")[1]
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "username": username,
          "password": parseInt(id),
          "avatar": avatar,
          "profile": profileLink,
          "permissions": ""
      });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      
      };

      fetch("https://th-extension.lukeg294.repl.co/users", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  } else {
      showMessage("That's not a valid profile link.","error")
  }
}
