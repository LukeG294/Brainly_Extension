import ReactDOM from "react-dom/client";
import App from "./App";

export async function InjectReactApp() {
  const root = ReactDOM.createRoot(document.getElementById("app"));

  root.render(<App />);
}