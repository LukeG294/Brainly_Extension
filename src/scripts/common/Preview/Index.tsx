import react from "react"
import ReactDOM from "react-dom/client"
import App from "./Preview"
import Status from "../Notifications/Status"

export default new class Preview{
    private root;
    async Display(id){
        let load = new Status("preview")
        load.Show("Fetching data...", "blue", true, false)
        let dRef = await fetch("https://brainly.com/api/28/api_config/desktop_view").then(data => data.json());
        let data = await fetch(`https://brainly.com/api/28/api_tasks/main_view/${id}`).then(data => data.json());
        load.Close()
        document.body.insertAdjacentHTML("beforeend", `<div id="app"></div>`)
        this.root = ReactDOM.createRoot(document.getElementById("app"))

        this.root.render(<App id = {id} dRef = {dRef} data = {data}/>)
    }
}