import React, {useEffect} from "react"
import { Flex, Spinner, Button , Icon} from "brainly-style-guide"
import {loadNextPage, loadPrevPage} from "./verification_queue_functions"
import Item from "./ReactComponents/item"
import {List} from "./ReactComponents/itemList"
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
    const nextPage = async () =>{
        //fetch next page of items from server, runs on next page button click
        document.querySelector(".spinner-container").classList.add("show");
        let newdata = await loadNextPage();
        document.querySelector(".spinner-container").classList.remove("show");
        console.log(newdata)
        setItems(newdata);
    }
    const prevPage = async () => {
        //fetch next page of items from server, runs on next page button click
        document.querySelector(".spinner-container").classList.add("show");
        let newdata = await loadPrevPage();
        document.querySelector(".spinner-container").classList.remove("show");
        console.log(newdata)
        setItems(newdata);
    }
    return (
        <>
            <div data-testid="header">
                <div className="sg-flex sg-flex--justify-content-space-between sg-flex--align-items-center">
                    <a href="https://brainly.com"title="Go to main page">
                        <div className="sg-logo">
                            <img className="sg-logo__image" src="https://styleguide.brainly.com/images/logos/brainly-5c4a769505.svg" alt="brainly"/>
                        </div>
                    </a>
                </div>
                <div className="pagination">
                <Button
                
                    onClick={async function(){await prevPage()}}
                    icon={<Icon color="adaptive" type="arrow_left"/>}
                    iconOnly
                    type="transparent"
                
                />
                <p className = "pagenum">1</p>
                <Button
                    onClick={async function(){await nextPage()}}
                    icon={<Icon color="adaptive" type="arrow_right"/>}
                    iconOnly
                    type="transparent"
                />
                </div>
            </div>
            <Flex className="container">
                <div className="flash-messages-container"></div>
                <div className="spinner-container"> <Spinner /> </div>
                    <List obj = {items} />
            </Flex>
        </>
    )
}
