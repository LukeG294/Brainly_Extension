import react from "react"
import {Avatar, Text, Media, Breadcrumb, Button, Icon} from "brainly-style-guide"
import parse from "html-react-parser";
import Attachments from "./Attachments";
import {repMenu} from "scripts/views/homepage/Exports"

export default function Item({id, data, users}){
    let user = users.find(({id}) => id === data.user_id);
    let avatar:string;
    let userId = `https://brainly.com/profile/${user.nick}-${user.id}`
    let content = parse(data.content);
    try{avatar = user.avatar[64]}catch(err){avatar = null}

    return(
        <div className = "item">
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
            {/* <Button
                icon={<Icon color="adaptive" size={24} type="report_flag_outlined"/>}
                iconOnly
                size="m"
                type="transparent-light"
                onClick = {() => {}}
            /> */}
        </div>
    )
}