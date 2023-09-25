import Notify from "scripts/common/Notifications/Notify";
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
export async function main_control_permissions(){

    let permissions = await fetch(`https://lgextension.azurewebsites.net/configs/permission_keys`).then(data => data.json())
    return permissions
}
export async function get_feature_key_needed(feature){
    let key = await fetch(`https://lgextension.azurewebsites.net/configs/feature_keys`).then(data => data.json())
    return key[feature]  
}
export async function check_version(){
    var version = chrome.runtime.getManifest().version;
    let accepted_versions = await fetch(`https://lgextension.azurewebsites.net/configs/accepted_versions`).then(data => data.json())
    if(!accepted_versions.versions.includes(version)){
        Notify.Flash(`Hello! It seems like you're using a version of the extension that's no longer supported. Please visit chrome://extensions/ and click the refresh button to update to the latest version. Thank you!`,"error")
        document.cookie = "l.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
check_version()