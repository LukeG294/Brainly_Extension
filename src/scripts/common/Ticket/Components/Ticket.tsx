import React, {useEffect} from "react";
import BrainlyAPI from "../../BrainlyAPI"
import {Overlay, Flex, Box} from "brainly-style-guide"

export default function Ticket(id){
    useEffect(() => {
        let data = BrainlyAPI.GetQuestion(id);
    })

    return(
        <Overlay color="black">
            <Flex
            alignItems="center"
            fullHeight
            >
                <Box color="white">
                    content example
                </Box>
            </Flex>
        </Overlay>
    )
}