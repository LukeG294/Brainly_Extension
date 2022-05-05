import React, {useEffect} from "react"
import { Flex, Spinner } from "brainly-style-guide"
import {Header} from "./ReactComponents/pageLayout"
import Item from "./ReactComponents/item"
import {User} from "../common/user"

//react app goes here, make components in the other folder
export default function App() {
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        //fetch items from server, runs on page render
        const fetchItems = async () => {
            document.querySelector(".spinner-container").classList.add("show");
            let items = await fetch("https://th-extension.lukeg294.repl.co/get-all-verification-requests").then(data => data.json());
            document.querySelector(".spinner-container").classList.remove("show");
            console.log(items);
            setItems(items);
        }
        fetchItems();
        
    }, [])
    let usr = new User();
    return (
        <>
            <Header />
            <Flex className="container">
                <div className="flash-messages-container"></div>
                <div className="spinner-container"> <Spinner /> </div>
                {items.map( item => (
                    <Item 
                        key={item.data.id}
                        content={item.data.content}
                        thanks={item.data.settings.thanks}
                        rating={item.data.settings.mark}
                        created={item.data.settings.created}
                        ansdata={item.data}
                        answerer = {item.data.user}
                        faunadbid = {item.ref["@ref"].id}
                    />
                ))}
            </Flex>
        </>
    )
}
