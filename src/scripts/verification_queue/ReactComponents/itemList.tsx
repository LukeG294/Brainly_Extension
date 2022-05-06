import React, {useEffect} from "react"
import Item from "./item"

interface list{
    obj
}
export function List({obj}: list){
    
    return(
        <>
        {obj.map( item => (
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
        </>
    )
}