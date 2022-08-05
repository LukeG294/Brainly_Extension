import react from "react"
import ReactDOM from "react-dom/client"
import App from "./Preview"

export default new class Preview{
    private root;
    async Display(id){
        let dRef = await fetch("https://brainly.com/api/28/api_config/desktop_view").then(data => data.json());
        let data = await fetch(`https://brainly.com/api/28/api_tasks/main_view/${id}`).then(data => data.json());
        console.log(data)
        document.body.insertAdjacentHTML("beforeend", `<div id="app"></div>`)
        this.root = ReactDOM.createRoot(document.getElementById("app"))

        this.root.render(<App id = {id} dRef = {dRef} data = {data}/>)
    }
}