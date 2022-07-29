export default new class ExtAPI{
    url= 'https://server.grayson03.repl.co'

    async getPermissions(username: string,password: string){   
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
        let txt = await fetch(`${this.url}/login`, requestOptions)
            .then(data => data.text())
        
        if (txt){
          if (JSON.parse(txt).statusCode === 401){
            return ''
          } else {
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
            let resp = await fetch(`${this.url}/users/`+documentID,request).then(data => data.text());
            let permissionsResponseJSON = JSON.parse(resp)
            return permissionsResponseJSON["data"]["permissions"]
          }
          
        }
    }
}