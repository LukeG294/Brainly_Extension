import {login_form} from "./RyverModal"

function encodeUser(username:string, password:string){    
    let userString = `${username}:${password}`
    var encodedStringBtoA = btoa(userString);
    console.log(encodedStringBtoA);
    return(encodedStringBtoA);
}
export function test_user(username:string, password:string){
    let token = encodeUser(username, password)
   
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        if (this.status === 200){
            localStorage.setItem("userAuth", token)
            location.reload()
        } else {
          (<HTMLInputElement>document.querySelector(".ryv-notif .username")).value = '';
          (<HTMLInputElement>document.querySelector(".ryv-notif .password")).value = '';
          document.querySelector(".ryv-notif .username").classList.add("sg-input--invalid");
          document.querySelector(".ryv-notif .password").classList.add("sg-input--invalid");
        }
      }
    });
    
    xhr.open("GET", "https://brainlyus.ryver.com/api/1/odata.svc/users");
    xhr.setRequestHeader("Authorization", "Basic "+token);
    
    xhr.send();
}
export function login_run(){
    document.querySelector(".notif_close").addEventListener("click", async function(){
        document.querySelector(".ryv-notif").remove()
      });
      document.querySelector(".ryv-notif > h1").addEventListener("click", function(){
        document.querySelector(".ryv-notif > h1").remove();
        document.querySelector(".ryv-notif > img").remove();
        document.querySelector(".ryv-notif").insertAdjacentHTML("beforeend",<string>login_form())
        document.querySelector(".check-user").addEventListener("click", function(){
          let inputUser = (<HTMLInputElement>document.querySelector(".ryv-notif .username")).value;
          let inputPass = (<HTMLInputElement>document.querySelector(".ryv-notif .password")).value;
          test_user(inputUser, inputPass);
        });
      });

}