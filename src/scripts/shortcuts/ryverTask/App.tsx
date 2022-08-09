import react from "react"
import {Overlay, Flex, Box} from "brainly-style-guide"

export default function App({modRep, modGen}){
    console.log(modRep, modGen)
    return(
    <Overlay color="black">
        <Flex
        alignItems="center"
        fullHeight
        >
            <Box color="white">
                modreptasks
            </Box>
        </Flex>
    </Overlay>
    )
}
