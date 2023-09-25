import Notify from "../../common/Notifications/Notify"
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


async function getData(){
    let me = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
    let {id} = me.data.user
    
    let data = await fetch(`https://lgextension.azurewebsites.net/get_user/`+id)
    if (data.status === 200){
      const json = await data.json();
      if (!json.permissions || json.permissions === ''){
        setCookie("l.token", btoa(json.permissions),"30")
        Notify.Flash(`You're not authorized to use these tools. If you think this is an error, please refresh. Otherwise, please contact management. Thanks! `, "error");
      } else {
        let old_cookie = getCookie("l.token")
        if (old_cookie !== "" && old_cookie === btoa(json.permissions)){
          //pass
        } else {
          setCookie("l.token", btoa(json.permissions),"30")
        }
      }
    } else if (data.status === 400) {
      Notify.Flash(`You're not authorized to use these tools. If you think this is an error, please refresh. Otherwise, please contact management. Thanks! `, "error");
    }
    
    
    // do something with response here, not outside the function
   
    
}

getData()