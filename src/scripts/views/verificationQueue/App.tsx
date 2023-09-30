import React, {useEffect} from "react"
import { Flex, Spinner, Button , Icon, Dropdown} from "brainly-style-guide"
import {verificationSwitcherHandler} from "./VerificationQueueFunctions"
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
            let items = await fetch(`${extension_server_url()}/verification/queue/0`).then(data => data.json());
            setSpin('')
            if(items.length === 0){document.querySelector(".empty").classList.add("show")}
            setItems(items);
            let d_reference = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_config/desktop_view`, {method: "GET"}).then(data => data.json());
        }
        fetchItems();
    }, [])
    return (
        <>
            <Head setItems = {setItems} setSubjects = {setSubjects}/>
            <div className="content">
                <div className="menu">
                    
                    <Button type='solid' className={"outerButtonSwitcher"} onClick={() => verificationSwitcherHandler(setItems)}> <Dropdown name={"Verification"} links={[{'label':'Verification','url':'repl-this-verify'},{'label':'Unverification','url':'repl-this-unverify'}]}></Dropdown></Button>
                </div>
                <Flex className="container">
                    <div className="flash-messages-container"></div>
                    <div className={`spinner-container ${spin}`}> <Spinner /> </div>
                        <List obj = {items} />
                </Flex>
            </div>
            
        </>
    )
}