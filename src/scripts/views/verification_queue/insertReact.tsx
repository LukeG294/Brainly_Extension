
import ReactDOM from "react-dom/client";
import App from "./App";

export async function InjectReactApp() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  let perms = localStorage.userPerms.split(",")
  let user = await fetch(`https://brainly.com/api/28/api_users/me`).then(data => data.json())
  let num = user.data.user.mod_actions_count
 
  if (perms.includes("5") && num || perms.includes("4") && num){
    root.render(<App />);
   
  } else {
    window.location.href = '/'
  }
  
}
