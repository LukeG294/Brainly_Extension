import React from 'react';
import { Button , Icon} from "brainly-style-guide"
import { loadNextPage, loadPrevPage, UpdateCount } from '../VerificationQueueFunctions';


export default function Head({setItems, setSubjects}){
    UpdateCount()
    const nextPage = async () =>{
        //fetch next page of items from server, runs on next page button click
        document.querySelector(".spinner-container").classList.add("show");
        let newdata = await loadNextPage();
        document.querySelector(".spinner-container").classList.remove("show");
        if (newdata){
            setItems(newdata);
        }
       
        
    }
    const prevPage = async () => {
        //fetch previous page of items from server, runs on previous page button click
        document.querySelector(".spinner-container").classList.add("show");
        let prevData = await loadPrevPage();
        document.querySelector(".spinner-container").classList.remove("show");
        if (prevData){
            setItems(prevData);
        }
        
        
    }
    return(
        <div data-testid="header">
                <div className="sg-flex sg-flex--justify-content-space-between sg-flex--align-items-center">
                    <a href="https://brainly.com"title="Go to main page">
                        <div className="sg-logo">
                            <img className="sg-logo__image" src="https://styleguide.brainly.com/images/logos/brainly-5c4a769505.svg" alt="brainly"/>
                        </div>
                    </a>
                </div>
                <h3 className="count"></h3>
                <div className="pagination">
                <Button
                
                    onClick={async function(){await prevPage()}}
                    icon={<Icon color="adaptive" type="arrow_left"/>}
                    iconOnly
                    type="transparent"
                
                />
                <p className = "pagenum"><div className='literalNum'>1</div></p>
                <Button
                    onClick={async function(){await nextPage()}}
                    icon={<Icon color="adaptive" type="arrow_right"/>}
                    iconOnly
                    type="transparent"
                />
                </div>
            </div>
    )
}