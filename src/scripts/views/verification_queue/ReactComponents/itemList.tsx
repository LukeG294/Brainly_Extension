import React, {useEffect} from "react"
import Item from "./item"
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
                    />
                ))
            }
            </>
        )
    }else{
        document.querySelector(".spinner-container").classList.remove("show");
        return(
            <div className="empty">
                <img src={runtime.getURL("resources/Compositions/Leadership_Development.svg")} alt="" />
            </div>
        )
    }
}