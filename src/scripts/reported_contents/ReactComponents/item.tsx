import React from "react";
import { SubjectIconBox, SubjectIcon, Media, Avatar, Text, Button, Icon, Label, Spinner} from "brainly-style-guide";

import {get_time_diff} from "../../common/common_functions"
import {insert_ticket} from "../../common/mod_functions"
import {Answer} from "../../common/content"

interface Item{
    content_short: string;
    created: string;
    grade_id: string;
    model_id: string;
    model_type_id: string;
    report: object,
    subject_id: string;
    task_id: string;
    user: object;
}

export default function Item({ content_short, created, grade_id, model_id, model_type_id, report, subject_id, task_id, user}: Item) {
    let subjects = JSON.parse(localStorage.subjects)
   
    return(
        <div className = "item" datatype = {task_id}>
            <div className="spinner-container"><Spinner /></div>
            <div className="head">
                <svg className="sg-subject-icon">
                    <use xlinkHref={"#icon-subject-"+subjects[subject_id].slug}/>
                </svg>
                <div className = "sg-flex flex-direction-column">
                    <h2 
                    className="sg-text sg-text--large sg-text--gray sg-text--bold qid"
                    onClick={async () => await insert_ticket(task_id, document.querySelector(`[ datatype = '${task_id}']`))}
                    >
                        {"#"+task_id}
                    </h2>

                    <h2 className="sg-text sg-text--large sg-text--gray created">{get_time_diff(created)}</h2>
                </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: content_short}}></div>
            
           
            <div className="options">
                <div className="user">
                    <Avatar  />
                </div>
                <div className="actions">
                
                <div className="ignoreRequest"> 
                        <Spinner size={"xsmall"} />
                        <Button
                        
                      
                        icon={<Icon color="adaptive" size={24} type="close"/>}
                        iconOnly
                        size="m"
                        toggle="peach"
                        type="outline"
                        className = "cancel"
                        />
                    </div>
                    <div className="approveRequest"> 
                        <Spinner size={"xsmall"} />
                        <Button
                       
                        icon={<Icon color="adaptive" size={24} type="check"/>}
                        iconOnly
                        size="m"
                        toggle="blue"
                        type="outline"
                        className = "approve"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
