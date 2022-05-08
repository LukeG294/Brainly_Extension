import { brainly_legacy_api_url } from "configs/config";
import ReactDOM from "react-dom/client";
import App from "./App";

export async function InjectReactApp() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  let perms = localStorage.userPerms.split(",")
  let user = await fetch(`${brainly_legacy_api_url()}/api_users/me`).then(data => data.json())
  let num = user.data.user_category
  if (perms.includes("5") && num !== 100 || perms.includes("4") && num !== 100){
    root.render(<App />);
   
  } else {
    window.location.href = '/'
  }
  
}
