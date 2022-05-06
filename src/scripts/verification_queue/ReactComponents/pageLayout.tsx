import React from "react"
import {Button, Icon} from "brainly-style-guide"
import {loadNextPage, loadPrevPage} from "../verification_queue_functions"
export function Header(){
    return(
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
          
            onClick={async function(){await loadPrevPage()}}
            icon={<Icon color="adaptive" type="arrow_left"/>}
            iconOnly
            type="transparent"
           
        />
        <p className = "pagenum">1</p>
        <Button
            onClick={async function(){await loadNextPage()}}
            icon={<Icon color="adaptive" type="arrow_right"/>}
            iconOnly
            type="transparent"
        />
        </div>
    </div>
    )
}