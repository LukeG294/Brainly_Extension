import ReactDOM from "react-dom/client";
import App from "./App";

export async function InjectReactApp() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  let perms = localStorage.getItem("userPerms");
  if (perms.includes("14")){
    root.render(<App />);
  } else {
    window.location.href = '/'
  }
  
}
