import React, {useEffect} from "react"
import Item from "./Item"
import {runtime} from "webextension-polyfill"

interface list{
    obj
}
export function List({obj}: list){
    
    if(obj.length >0){
        return(
            <>
            {
                obj.map( item => (
                    <Item 
                        key={item.id}
                        content={item.content}
                        thanks={item.settings.thanks}
                        rating={item.settings.mark}
                        created={item.settings.created}
                        ansdata={item}
                        answerer = {item.user}
                        faunadbid = {"d"}
                        requesterAv = {item.requesterAv}
                        requesterName = {item.requesterName}
                        requesterId = {item.requesterId}
                    />
                ))
            }
            </>
        )
    }else{
        //document.querySelector(".spinner-container").classList.remove("show");
        return(
            <div className="empty">
                <img src={runtime.getURL("resources/Compositions/Leadership_Development.svg")} alt="" />
            </div>
        )
    }
}