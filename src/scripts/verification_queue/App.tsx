import React, {useEffect} from "react"
import { Flex, Button, Headline, Spinner } from "brainly-style-guide"
import {Header} from "./ReactComponents/pageLayout"
import Item from "./ReactComponents/item"

//react app goes here, make components in the other folder
export default function App() {
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        //fetch items from server, runs on page render
        const fetchItems = async () => {
            let items = await fetch("https://th-extension.lukeg294.repl.co/get-all-verification-requests").then(data => data.json());
            console.log(items);
            setItems(items);
        }
        fetchItems();
    }, [])
    return (
        <>
            <Header />
            <Flex className="container">
                {items.map(item => (
                    <Item 
                    key = {item.data.id}
                    content = {item.data.content} 
                    thanks = {item.data.thanks}
                    rating = {item.data.mark}
                    />
                ))}
            </Flex>
        </>
    )
}
