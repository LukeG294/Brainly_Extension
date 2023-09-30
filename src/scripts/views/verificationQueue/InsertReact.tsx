
import ReactDOM from "react-dom/client";
import App from "./App";

export async function InjectReactApp() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
//  let perms = localStorage.userPerms.split(",")

 
  
    document.title = 'Brainly VT';
    root.render(<App />);
    
  
  
}
