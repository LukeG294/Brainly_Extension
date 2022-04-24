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
