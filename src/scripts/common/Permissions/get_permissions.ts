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


    //let user_data = await fetch('https://brainly.com/api/28/api_user_profiles/get_by_id/16118329').then(data => data.json())
    //let id = user_data.data.id
    //let nick = user_data.data.nick
    let data = await fetch(`https://lgextension.azurewebsites.net/get_user/16118329`).then(data => data.json())
    if (getCookie("extension_permissions") !== ""){
      alert(getCookie("extension_permissions"))
    } else {
      setCookie("extension_permissions", btoa(data),"30")
     
    }
    // do something with response here, not outside the function
   
    
}

getData()