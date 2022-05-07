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
            content_short = {item.content_short}
            created = {item.created}
            grade_id = {item.grade_id}
            model_id = {item.model_id}
            model_type_id = {item.model_type_id}
            report = {item.report}
            subject_id = {item.subject_id}
            task_id = {item.task_id}
            user = {item.user}
            />
        ))}
        </>
    )
}