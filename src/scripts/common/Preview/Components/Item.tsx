import react from "react"
import {Avatar, Text, Media, Breadcrumb, Button, Icon} from "brainly-style-guide"
import parse from "html-react-parser";
import Attachments from "./Attachments";
import {repMenu, successFn} from "scripts/views/homepage/Exports"

export default function Item({id, data, users, type}){
    let user = users.find(({id}) => id === data.user_id);
    let avatar:string;
    let userId = `https://brainly.com/profile/${user.nick}-${user.id}`
    let content = parse(data.content);
    try{avatar = user.avatar[64]}catch(err){avatar = null}

    return(
        <div className = {`item id-${id} ${data.settings.is_marked_abuse?"reported":""}`}>
            <Media
                aside={<Avatar
                    imgSrc={avatar}
                    link= {userId}
                />}
                contentArray={[
                    <Text 
                    weight="bold"
                    >
                        {user.nick}
                    </Text>,
                    
                    <Text
                    style = {{
                        color: user.ranks.color,
                        fontSize: '1rem',
                        lineHeight: '1rem'
                    }}
                    >
                        {user.ranks.names[0]}
                    </Text>
                ]}
            />
            <Text className = "content">
                {content}
            </Text>
            <Attachments attachments = {data.attachments} />
            { <Button
                className = "rep-button"
                icon={<Icon color="adaptive" size={24} type="report_flag_outlined"/>}
                iconOnly
                size="m"
                type="transparent-light"
                onClick = {() => {
                    repMenu(id, document.querySelector(`.item.id-${id}`), type, reportSuccess, document.querySelector(`.item.id-${id}`))
                }}
            /> }
        </div>
    )
}

function reportSuccess(element){
    element.classList.add("reported");
    try{
        successFn(document.querySelector(`#report-${element.classList[1].split("-")[1]}`).parentElement)
    }catch(err){console.log(err)}
}