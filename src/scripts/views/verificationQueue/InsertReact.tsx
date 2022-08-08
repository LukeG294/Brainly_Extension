
import ReactDOM from "react-dom/client";
import App from "./App";
import {subjectFilterHandler} from "./VerificationQueueFunctions"

export async function InjectReactApp() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  let perms = localStorage.userPerms.split(",")

 
  if (perms.includes("4")  || perms.includes("6") || perms.includes("7")){ //admin or vt mod or vt admin
    document.title = 'Brainly Companion';
    root.render(<App />);
    
  } else {
    window.location.href = '/'
  }
  
}
