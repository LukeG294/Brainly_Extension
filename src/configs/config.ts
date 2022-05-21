export function extension_server_url(){
    return 'https://server.grayson03.repl.co'
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
