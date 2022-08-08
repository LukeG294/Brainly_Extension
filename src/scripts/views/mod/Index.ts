import {queue_subscribe, setAuth} from "../../common/LiveMod"

setAuth()
function Queuefn(){
    console.log("mutation")
    const mod_items = document.querySelectorAll(".content .moderation-item");
    for (let item of Array.from(mod_items)) {
        if (item.getAttribute("status") === "observing") continue;
        let qid = (<HTMLElement>item.querySelector(".task-url")).innerHTML;
        item.setAttribute("status", "observing")
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

addObserverIfFeedAvailable()
