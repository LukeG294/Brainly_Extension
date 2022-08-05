import react, {useEffect} from "react"
import {Overlay, Flex, Box, Icon, Button} from "brainly-style-guide"
import Head from "./Components/Head"
import Item from "./Components/Item"

export default function App({id, dRef, data}) {
    let subject = dRef.data.subjects.find(({id}) => id === data.data.task.subject_id).name
    let grade = dRef.data.grades.find(({id}) => id === data.data.task.grade_id).name;

    return (
    <Overlay color="black">
        <Flex
        alignItems="center"
        fullHeight
        >
            <Box color="white" className = "preview-box">
                <Button
                    className="close" icon={<Icon color="adaptive" size={24} type="close"/>} iconOnly size="m" type="transparent" onClick={() => document.querySelector("#app").remove()}
                />
                <Head subject = {subject} grade = {grade} id = {id} data = {data.data.task} />

                <div className="items">
                    <Item id = {id} users = {data.users_data} data = {data.data.task}/>

                    {
                        data.data.responses.map(({id}, index) => {
                            return(
                                <Item 
                                    id = {id} 
                                    key = {index} 
                                    users = {data.users_data} 
                                    data = {data.data.responses[index]}
                                />
                            )
                        })
                    }
                </div>
            </Box>
        </Flex>
    </Overlay>
    )
}