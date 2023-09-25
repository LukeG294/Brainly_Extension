export function extension_server_url(){
    return 'https://vserver.lukeg294.repl.co'
}
export function parseProfileLink(link: string){
    return link.split("/")[4].split("-")[1]
}
export function parseQuestionLink(link: string){
    return link.split("?")[0].split("/")[4]
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
export function main_control_permissions(){
    let permissions = {
        "Administrator":"0",
        "Moderator":"1",
        "Junior Moderator":"2"
       
    }
    return permissions
}
