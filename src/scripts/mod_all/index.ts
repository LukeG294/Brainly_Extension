import {queue_subscribe} from "../common/livemod"
function Queuefn(){
    console.log("mutation")
    const mod_items = document.querySelectorAll(".content .moderation-item");
    for (let item of Array.from(mod_items)) {
        let qid = item.querySelector(".task-url").innerHTML;
        console.log(qid);
        item.setAttribute("id", qid);
    }
    queue_subscribe();
}
const observer = new MutationObserver(Queuefn);
const addObserverIfFeedAvailable = () => {
  let target = document.querySelector(".content");
  if(!target) return setTimeout(addObserverIfFeedAvailable, 500);
  
  observer.observe(target, { attributes: true, childList: true, characterData: true, subtree: true });
  Queuefn();
};
/*
setTimeout(() => {
    addObserverIfFeedAvailable();
}, 10000);

*/
