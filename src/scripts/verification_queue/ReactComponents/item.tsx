import React from "react";
import { SubjectIconBox, SubjectIcon, Media, Avatar, Text, Button, Icon, Label} from "brainly-style-guide";
import {get_time_diff} from "../../common/common_functions"

interface Item{
    content: string;
    thanks: string;
    rating: string;
    created: string;
    qid: string;
    req_pfp: string;
}

export default function Item({content, thanks, rating, created, qid, req_pfp}: Item) {
    return(
        <div className = "item" data-testid="item">
            <div className="head">
                <svg className="sg-subject-icon">
                    <use xlinkHref="#icon-subject-accountancy"/>
                </svg>
                <div className = "sg-flex flex-direction-column">
                    <h2 className="sg-text sg-text--large sg-text--gray sg-text--bold username">username</h2>
                    <h2 className="sg-text sg-text--large sg-text--gray created">{get_time_diff(created)}</h2>
                </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
            
            <div className="stats">
                <Label className = "thanks" color="achromatic" iconType="heart" type="transparent">{thanks}</Label>
                <Label className = "rating" color="achromatic" iconType="star" type="transparent">{rating}</Label>
            </div>
            <div className="options">
                <div className="user">
                    <Avatar imgSrc={req_pfp} />
                </div>
                <div className="actions">
                    <Button
                    icon={<Icon color="adaptive" size={24} type="close"/>}
                    iconOnly
                    size="m"
                    toggle="peach"
                    type="outline"
                    className = "cancel"
                    />
                    <Button
                    icon={<Icon color="adaptive" size={24} type="check"/>}
                    iconOnly
                    size="m"
                    toggle="blue"
                    type="outline"
                    className = "approve"
                    />
                    <Button id = {qid}
                    icon={<Icon color="adaptive" size={24} type="shield"/>}
                    iconOnly
                    size="m"
                    toggle="mustard"
                    type="outline"
                    className = "ticket"
                    />
                </div>
            </div>
        </div>
    )
}
