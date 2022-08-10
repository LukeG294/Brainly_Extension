import Components from "scripts/Items/Components"
import Preview from "scripts/common/Preview/Index"

function pageFn(){
    let itemList;
    if(window.location.href.includes("question")){
      itemList = document.querySelector("[data-testid = 'user_profile_tab_content_wrapper']")
    }else{
      itemList = document.querySelector("[data-testid = 'user_profile_list']")
    }
    
    Array.from(itemList.children).forEach((item:Element) => {
      if(item.id === "modified") return
      let qLink = (<HTMLAnchorElement>item.querySelector("a")).href
      item.querySelector(".sg-box").insertAdjacentElement("beforeend", 
        Components.Button({
          size: "m",
          ClassNames: ["preview-button"],
          icon: "seen",
          iconSize: "24",
          type: "solid"
        })
      )
      item.querySelector(".preview-button").addEventListener("click", () => {
        Preview.Display(qLink.replace("https://brainly.com/question/", ""))
      })
      item.id = "modified"
    })
}


const observer = new MutationObserver(pageFn);
export const addPreviewBut = () => {
  let target = document.querySelector("[data-testid = 'profile_page_content']");
  if(!target) return setTimeout(addPreviewBut, 200);
  
  observer.observe(target, { attributes: true, childList: true, characterData: true, subtree: true });
  
};

addPreviewBut()