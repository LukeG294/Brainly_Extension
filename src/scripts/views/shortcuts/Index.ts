import ryverTask from "./ryverTask/createTask";

let perms = localStorage.userPerms.split(",");
if(perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    ryverTask();
}