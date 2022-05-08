export function extension_server_url(){
    return 'https://1448-2603-8001-3203-e8da-4c33-37e4-71b0-7121.ngrok.io'
}
export function brainly_legacy_api_url(){
    return 'https://brainly.com/api/28'
}
export function brainly_graphql_url(){
    return 'https://brainly.com/graphql/us'
}
export function parseProfileLink(link: string){
    return link.split("/")[4].split("-")[1]
}
export function parseQuestionLink(link: string){
    return link.split("/")[4]
}
export function currentLocalizationFile(){
    return "en_US.json"
}
export function pageElement(selector: string){
    return document.querySelector(selector)
}
export function pageElementAll(selector: string){
    return document.querySelectorAll(selector)
}