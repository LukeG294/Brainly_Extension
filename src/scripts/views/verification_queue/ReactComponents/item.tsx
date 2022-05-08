import React from "react";
import { SubjectIconBox, SubjectIcon, Media, Avatar, Text, Button, Icon, Label, Spinner} from "brainly-style-guide";
import {approveAnswer, removeAnswer} from "../verification_queue_functions"
import {get_time_diff} from "../../../common/common_functions"
import {insert_ticket} from "../../../common/mod_functions"

interface Item{
    key: string;
    content: string;
    thanks: string;
    rating: string;
    created: string;
    ansdata
    faunadbid:string;
    answerer
}

export default function Item({ content, thanks, rating, created, ansdata, faunadbid, answerer}: Item) {
    console.log(ansdata)
    return(
        <div className = "item" datatype = {ansdata.settings.id}>
            <div className="spinner-container"><Spinner /></div>
            <div className="head">
                <svg className="sg-subject-icon">
                    <use xlinkHref={"#icon-subject-"+ansdata.subject.toLowerCase()}/>
                </svg>
                <div className = "sg-flex flex-direction-column">
                    <h2 
                    className="sg-text sg-text--large sg-text--gray sg-text--bold qid"
                    onClick={async () => await insert_ticket(ansdata.qid, document.querySelector(`[ datatype = '${ansdata.settings.id}']`))}
                    >
                        {"#"+ansdata.qid}
                    </h2>

                    <h2 className="sg-text sg-text--large sg-text--gray created">{get_time_diff(created)}</h2>
                </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
            
            <div className="stats">
                <Icon
                className= {ansdata.settings.attachments.length > 0 ? "attachment" : "no-attachment"}
                color="adaptive"
                size={16}
                type="attachment"
                />
                <Label className = "thanks" color="achromatic" iconType="heart" type="transparent">{thanks}</Label>
                <Label className = "rating" color="achromatic" iconType="star" type="transparent">{rating}</Label>
                <Icon
                className = {ansdata.settings.isMarkedAbuse ? "reported" : "not-reported"}
                color="icon-red-50"
                size={16}
                type="report_flag"
                />
            </div>
            <div className="options">
                <div className="user">
                    <Avatar imgSrc={ansdata.user.data.userById.avatar.url} />
                </div>
                <div className="actions">
                
                <div className="ignoreRequest"> 
                        <Spinner size={"xsmall"} />
                        <Button
                        
                        onClick={async () =>  await removeAnswer(faunadbid, document.querySelector(`[ datatype = '${ansdata.settings.id}'] .ignoreRequest`))}
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
                        onClick={async () =>  await approveAnswer(faunadbid, ansdata.answerDBid, document.querySelector(`[ datatype = '${ansdata.settings.id}'] .approveRequest`))}
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
