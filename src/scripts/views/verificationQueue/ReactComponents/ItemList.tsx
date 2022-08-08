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
                        key={item.data.id}
                        content={item.data.content}
                        thanks={item.data.settings.thanks}
                        rating={item.data.settings.mark}
                        created={item.data.settings.created}
                        ansdata={item.data}
                        answerer = {item.data.user}
                        faunadbid = {item.ref["@ref"].id}
                        requesterAv = {item.data.requesterAv}
                        requesterName = {item.data.requesterName}
                        requesterId = {item.data.requesterId}
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