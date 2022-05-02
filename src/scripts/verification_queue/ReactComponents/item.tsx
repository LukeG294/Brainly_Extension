import React from "react";
import { SubjectIconBox, SubjectIcon, Media, Avatar, Text, Button, Icon, Label} from "brainly-style-guide";

interface Item{
    content: string;
    thanks: string;
    rating: string;
}

export default function Item({content, thanks, rating}: Item) {
    return(
        <div className = "item" data-testid="item">
            <div className="head">
                <svg className="sg-subject-icon">
                    <use xlinkHref="#icon-subject-accountancy"/>
                </svg>
                <h2 className="sg-text sg-text--large sg-text--gray sg-text--bold">username</h2>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
            
            <div className="stats">
                <Label className = "thanks" color="achromatic" iconType="heart" type="transparent">{thanks}</Label>
                <Label className = "rating" color="achromatic" iconType="star" type="transparent">{rating}</Label>
            </div>
            <div className="options">
                <div className="user">
                    <Avatar imgSrc="https://images.unsplash.com/photo-1645287628160-c7d824ebf16f?w=200" />
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
                </div>
            </div>
        </div>
    )
}
