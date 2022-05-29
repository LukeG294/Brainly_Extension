import React, {useEffect} from "react"
import { Flex, Spinner, Dropdown} from "brainly-style-guide"
import {List} from "./ReactComponents/ItemList"
import Head from "./ReactComponents/Header"
import { extension_server_url } from "configs/config";

//react app goes here, make components in the other folder
export default function App() {


    const [items, setItems] = React.useState([]);
    const [spin, setSpin] = React.useState("show");

    useEffect(() => {
        //fetch items from server, runs on page render
        const fetchItems = async () => {
            let items = await fetch(`${extension_server_url()}/get_next_page/0`).then(data => data.json());
            setSpin('')
            if(items.length === 0){document.querySelector(".empty").classList.add("show")}
            setItems(items);
        }
        fetchItems();
    }, [])
    return (
        <>
            <Head setItems = {setItems} />
            <Dropdown name={""} links={[{"label":'s', 'url':'https://www.google.com'}]} fullWidth={false}></Dropdown>
            <Flex className="container">
                <div className="flash-messages-container"></div>
                <div className={`spinner-container ${spin}`}> <Spinner /> </div>
                    <List obj = {items} />
            </Flex>
        </>
    )
}
