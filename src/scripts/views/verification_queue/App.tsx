import React, {useEffect} from "react"
import { Flex, Spinner, Button , Icon, Dropdown} from "brainly-style-guide"
import {loadNextPage, loadPrevPage, subjectFilterHandler, verificationSwitcherHandler} from "./VerificationQueueFunctions"
import {List} from "./ReactComponents/ItemList"
import Head from "./ReactComponents/Header"
import { extension_server_url } from "configs/config";
import Extension from "../../../locales/en/localization.json"

//react app goes here, make components in the other folder
export default function App() {


    const [items, setItems] = React.useState([]);
    const [subArr, setSubjects] = React.useState([]);
    const [spin, setSpin] = React.useState("show");

    useEffect(() => {
        //fetch items from server, runs on page render
        const fetchItems = async () => {
            let items = await fetch(`${extension_server_url()}/get_next_page/0`).then(data => data.json());
            setSpin('')
            if(items.length === 0){document.querySelector(".empty").classList.add("show")}
            setItems(items);
            let d_reference = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_config/desktop_view`, {method: "GET"}).then(data => data.json());
            let subArray = []
            let subjects = d_reference.data.subjects
            subArray.push({'label':`All`, 'count':100, 'url':'subject-all'})
            subjects.forEach(async subject => {
                let subjectCount = await fetch(`${extension_server_url()}/get_by_subject/${subject.icon}`, {method: "GET"}).then(data => data.json());
                if (subjectCount > 0){
                    subArray.push({'label':`${subject.name} (${subjectCount})`, 'count':subjectCount, 'url':'subject-'+subject.icon})
                }
            })
            
            subArray = subArray.sort((a, b) => a.count < b.count ? 1 : -1)
            setSubjects(subArray)
            
            
        }
        fetchItems();
    }, [])
    return (
        <>
            <Head setItems = {setItems} setSubjects = {setSubjects}/>
            <div className="content">
                <Button type='solid' className={"outerButton"} onClick={() => subjectFilterHandler(setItems)}> <Dropdown name={"Subject"} links={subArr}></Dropdown></Button>
                <Button type='solid' className={"outerButtonSwitcher"} onClick={() => verificationSwitcherHandler(setItems)}> <Dropdown name={"Verification"} links={[{'label':'Verification','url':'repl-this-verify'},{'label':'Unverification','url':'repl-this-unverify'}]}></Dropdown></Button>
                <Flex className="container">
                    <div className="flash-messages-container"></div>
                    <div className={`spinner-container ${spin}`}> <Spinner /> </div>
                        <List obj = {items} />
                </Flex>
            </div>
            
        </>
    )
}
