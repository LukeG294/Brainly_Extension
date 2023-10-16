import {find, runtime} from "webextension-polyfill";
import {ticket} from "./ticket_exp"
import {Answer, CommentHandler, Question} from "../Content"
import {get_time_diff} from "../CommonFunctions"
import BrainlyAPI from "../BrainlyAPI"
import Form from "../../Items/Form"
import {DelMenu, AnswerElem} from "../../Items/Snippets"
import Extension from "../../../locales/en/localization.json"
import { extension_server_url } from "configs/config";

function add_log(log){
  let ThisDate;
  let GroupedLog;
  for(let i = 0; i < log.data.length; i++){
    let date = log.data[i].date;
    let time = log.data[i].time;
    if(log.data[i].class === "added" || log.data[i].class === "edited"){
      let user = log.users_data.find(({id}) => id === log.data[i].user_id).nick;
      let user_id = log.users_data.find(({id}) => id === log.data[i].user_id).id;
      document.querySelector(".log").insertAdjacentHTML("beforeend",/*html*/`
      <div class="log-item">
        <div class = "content">${log.data[i].text.replace('%1$s',`<a class = 'user' target=_blank href = "/profile/${user}-${user_id}">${user}</a>`)}</div>
        <div class="datetime">
          <div class="date rightdot">${date}</div>
          <div class="time">${time}</div>
        </div>
      </div>
      `)
    }
    if(log.data[i].class === "deleted" || log.data[i].class === "accepted" || log.data[i].class === "reported" || log.data[i].class === "best"){
      let mod = log.users_data.find(({id}) => id === log.data[i].user_id).nick;
      let deleted = log.users_data.find(({id}) => id === log.data[i].owner_id).nick;
      let mod_id = log.users_data.find(({id}) => id === log.data[i].user_id).id
      let deleted_id = log.users_data.find(({id}) => id === log.data[i].owner_id).id
      document.querySelector(".log").insertAdjacentHTML("beforeend",/*html*/`
      <div class="log-item">
        <div class = "content">${log.data[i].text.replace("%1$s", `<a class = 'user' target=_blank href = "/profile/${mod}-${mod_id}">${mod}</a>`).replace("%3$s", `<a class = 'user' target=_blank href = "/profile/${deleted}-${deleted_id}">&nbsp;${deleted}</a>`)}</div>
        <div class="datetime">
          <div class="date rightdot">${date}</div>
          <div class="time">${time}</div>
        </div>
      </div>
      `)
    }
  }
}
async function add_deletion(del_rsn, elem, tid, type:string){
  //appending deletion reasons
  let reason_append = await fetch(`${extension_server_url()}/preset_messages/ext_action_note`).then(data => data.json())
  if (type === 'comment'){
    if (!elem.querySelector('.delmenu')){
      elem.insertAdjacentHTML("beforeend", DelMenu())
    } else {
      elem.querySelector('.delmenu').remove();
    }
    elem = elem.querySelector('.delmenu') 
  }
  console.log(del_rsn)
  elem.querySelector(".primary-items").outerHTML = Form.RadioGroup({
    ClassName: ["primary-items"],
    id: "primary",
    items: del_rsn,
    type: "row",
    LookFor: {
        id: "id",
        name: "text"
    }
  }).outerHTML

  
  //delete button listener
  if (type === 'comment'){
    elem.classList.toggle("show");
  } else {
    elem.querySelector('.delete').addEventListener("click", () => {
      type === 'response' ? elem.querySelector(".afc").classList.remove("show") : {};
      elem.querySelector(".delmenu").classList.toggle("show");
    })
  }
  

  //primary deletion reason listener
  elem.querySelector(".primary-items").addEventListener("change", async function(){
    if (type === 'comment'){
      elem.classList.add("secondary");
    } else {
      elem.querySelector(".delmenu").classList.add("secondary");
    }

    //finds selected item and links it to the object
    let selected_index = elem.querySelector(".primary-items input:checked").getAttribute("index");
    let selected_subcats = del_rsn[selected_index].subcategories;

    //inserting secondary deletion reasons
    elem.querySelector(".secondary-items").outerHTML = Form.RadioGroup({
        ClassName: ["secondary-items"],
        id: "secondary",
        type: "row",
        items: selected_subcats,
        LookFor: {
            name: "title",
            id: "id"
        }
    }).outerHTML

    //adds listener to the subcategories
    elem.querySelector(".secondary-items").addEventListener("change", function(){
      let selected_reason = selected_subcats[elem.querySelector(".secondary-items input:checked").getAttribute("index")]
      console.log(selected_reason);
      
      (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value = selected_reason.text;
    });
    elem.querySelector(".confirmdel button").addEventListener("click", function(){
      let warnuser = false;
      let takepts = false;
      let respts = true;
      if((<HTMLInputElement>elem.querySelector("input[id ^= 'warn']")).checked){
        warnuser = true;
      }
      if (type !== 'comment'){
        if((<HTMLInputElement>elem.querySelector("input[id ^= 'pts']")).checked){
          takepts = true;
        }
      }
      if(type === "task"){
        let thisq = new Question();
        if((<HTMLInputElement>elem.querySelector("input[id ^= 'res-pts']").checked)){
          respts = false
        }
        thisq.Delete(tid, (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value + " " + reason_append[0].text, warnuser, takepts, respts)
      }
      if(type === "response"){
        let thisa = new Answer();
        console.log(elem.querySelector("textarea.deletion-reason"))
        thisa.Delete(tid, (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value + " " + reason_append[0].text, warnuser, takepts)
      }
      if (type === "comment"){
        let thisc = new CommentHandler();
        thisc.Delete(tid, (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value + " " +  reason_append[0].text, warnuser)
        elem.style.display = 'none';
        elem.closest(".comment").classList.add("deleted");
       } else {
        elem.querySelector(".delmenu").classList.remove("show");
      }
      if(type === "response"){
        elem.classList.add("deleted");
      }
      if(type === "task"){
        document.querySelector(".question").classList.add("deleted");
        setTimeout(async () => {
          document.querySelector(".modal_back").remove()
          await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${tid},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
        }, 1000);
      }
    });
  });
}

function add_report(data, item, elem, type){
  if(item.report && type === 'UserReport'){
    let report_elem = elem.querySelector(".report")
    let reporter = data.users_data.find(({id}) => id === item.report.user.id)
    report_elem.querySelector(".report-info div").innerHTML = item.report?.abuse.name; 
    elem.classList.add("reported");
    report_elem.querySelector(".username").innerHTML = reporter.nick;
    let rank = reporter.ranks.names[0];
    if (!rank){rank="no rank"}
    report_elem.querySelector(".rank").innerHTML = rank
    report_elem.querySelector(".rank").setAttribute("style", `color: ${reporter.ranks.color}`)
  } else if (type === 'AFCReport') {
    let report_elem = elem.querySelector(".report")
    report_elem.querySelector(".report-info div").innerHTML = data.reason; 
    elem.classList.add("AFCreported");
    report_elem.querySelector(".username").innerHTML = data.user.id
    report_elem.querySelector(".rank").innerHTML = data.reported
    
  }
}
function add_comments(data, users_data, deletion_reasons, type:string, loopnum?){
  
  if(type === "task"){
    document.querySelector('.task-comments').insertAdjacentHTML("beforeend",`
    <div class='mass-actions'>
      <button style="margin-bottom:12px; width: 40%;" class=" select-all sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue"><span class="sg-button__icon sg-button__icon--m">
                            <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-3qxpca" focusable="false"><text id="title-heart-3qxpca" hidden="">heart</text>
                                <use xlink:href="#icon-add_more" aria-hidden="true"></use>
                              </svg></div>
                          </span><span class="sg-button__text">Select All Comments</span></button>
      <button style="margin-bottom:12px; width: 40%;" class=" select-all sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach delete-comments-mass"><span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-3qxpca" focusable="false"><text id="title-heart-3qxpca" hidden="">heart</text>
          <use xlink:href="#icon-close" aria-hidden="true"></use>
        </svg></div>
    </span><span class="sg-button__text">Delete Selected Comments</span></button>      
    </div>              
                        
                        `)
    document.querySelector('.select-all').addEventListener('click',function(){
      let boxes = document.querySelectorAll('.commentBoxes')
      boxes.forEach(element => {
        //@ts-expect-error
        if (!element.checked){element.checked = true}
      })
    })
    document.querySelector('.delete-comments-mass').addEventListener('click',function(){
   
      let boxes = document.querySelectorAll('.commentBoxes')
      boxes.forEach(element => {
        //@ts-expect-error
        if (element.checked){
          let id = element.id
          let commentObj = new CommentHandler()
          commentObj.Delete(id, 'Your comment was removed because it was not relevant to the question asked. Please keep in mind that all comments must be on-topic and focused on the question at hand. Thanks!', false)
          element.closest(".comment").classList.add("deleted")
        }
      })
    })
  
  }
 
  data.comments.forEach(element => {
    let commentpfp;
    var result = users_data.filter(obj => {
      return obj.id === element.user_id
    })
   
    if (!result[0].avatar){
      commentpfp = `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/img/avatars/100-ON.png`
    }
    else{
      commentpfp = result[0].avatar[64];
    }
    let selector:string;
    if(type === "task"){
      selector = ".task-comments"
    }
    else{
      selector = ".response-comments"+String(loopnum)
    }
    document.querySelector(selector).insertAdjacentHTML('beforeend',/*html*/`
      <div class="comment">
        <div class="comment-content">
          <div class="comment-data">
            <div class="sg-icon sg-icon--dark sg-icon--x32 rep-flag"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div>
           
            <div class="pfp"> <a href='https://brainly.com/profile/${result[0].nick}-${result[0].id}' target="_blank"> <img src=${commentpfp} alt=""></a></div>
            <div class="sg-text sg-text--small comment-content">${element.content}</div>
          </div>
          <div class="actions">
            <div class="actionbut confirmComment" confirmid='${element.id}' id='${element.id}' ><div class="sg-icon sg-icon--dark sg-icon--x32" style="fill: #60d399;"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div></div>
            <div class="actionbut deleteComment" typeid ='${element.id}' id='${element.id}'><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg" style='fill:red !important;'><use xlink:href="#icon-trash"></use></svg></div></div>
          </div>
        </div>
        
      </div>
    `)
      
      let commentDelete = document.querySelector(`[typeid="${element.id}"]`)
     
      if (element.deleted){
        commentDelete.closest(".comment").classList.add('deleted');
        commentDelete.closest(".actions").remove()
      }
      if (element.report){
        commentDelete.closest(".comment").classList.add('reported'); 
        let commentConfirm = document.querySelector(`[confirmid="${element.id}"]`)
        if (!commentConfirm.classList.contains('confAdded')){
          commentConfirm.addEventListener('click', async function(){
            let comment = new CommentHandler()
            await comment.Confirm(element.id)
            commentConfirm.closest(".comment").classList.remove('reported')
            commentConfirm.remove();
          })
        }
      }
      if (!commentDelete.classList.contains('delAdded')){
        commentDelete.addEventListener('click', function(){
          if (!commentDelete.querySelector('.delmenu')){
            add_deletion(deletion_reasons, commentDelete.closest(".comment"), element.id, "comment")
            commentDelete.classList.add("delAdded")
          }
          
        })
      }
      
      
    })
   
    
}
export function add_attachments(item, elem){
  if(item.attachments.length !== 0){
    let rotation = 0;
    if (elem.querySelector('.deleteAttachment')){
      elem.querySelector(".deleteAttachment").addEventListener("click", function(){
        let aID = elem.querySelector(".deleteAttachment").parentElement.parentElement.querySelector('img')
        let question = new Question();
        //@ts-expect-error
        question.DeleteAttachment(document.querySelector('.qlink').innerText.replace('#',''), aID.id)
        aID.parentElement.querySelector("img").classList.add("deleted")
      })
    }
    elem.querySelector(".rotate").addEventListener("click", function(){
      elem.querySelector(".attachments > img").setAttribute("style", `transform: rotate(${rotation+90}deg)`)
      rotation += 90;
    });
    elem.querySelector(".newtab").addEventListener("click", function(){
      window.open(elem.querySelector(".attachments > img").getAttribute("src"),"_blank");
    });
    
    if(item.attachments[0].extension === "png" || item.attachments[0].extension === "jpg" || item.attachments[0].extension === "jpeg" || item.attachments[0].extension === "gif"){
      elem.querySelector(".attachments").classList.add("show");
    elem.querySelector(".attachments").insertAdjacentHTML("beforeend",/*html*/`
    <img src=${JSON.stringify(item.attachments[0].full)} id=${item.attachments[0].id}>
    `)
    
    if(item.attachments.length > 1){
      for(let i = 0; i < item.attachments.length; i++){
        elem.querySelector(".attach-list").insertAdjacentHTML("beforeend",/*html*/`
          <img class = "attachimg${i}" id=${item.attachments[i].id} src=${JSON.stringify(item.attachments[i].thumbnail)} id = "img${i}">
        `)
        elem.querySelector(`img.attachimg${i}`).addEventListener("click", function(){
          elem.querySelector(".attachments > img").setAttribute("src", `${item.attachments[i].full}`)
        })
      }
    }
  }
  }
}
function user_content_data(user, elem, item){
  if(user.avatar !== null){
    elem.querySelector(".pfp").innerHTML = /*html*/`
      <img src=${user.avatar[64]} alt="">
      `
  }
  let rank = user.ranks.names[0];
  if (!rank){rank="no rank"}
  elem.querySelector(".text-user .username").innerHTML = user.nick;
  elem.querySelector(".text-user .username").setAttribute("href", `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/profile/${user.nick}-${user.id}`);
  elem.querySelector(".text-user .username").setAttribute("target", `_blank`);
  elem.querySelector(".text-user .rank").innerHTML = rank
  elem.querySelector(".text-user .rank").setAttribute("style", `color: ${user.ranks.color}`)
  elem.querySelector(".content").innerHTML = item.content;
}
function add_answer(ans,res,a, basic_data, users_data){
  let answerer = res.users_data.find(({id}) => id === ans.user.id);
  let answer_elem = AnswerElem(a)
  let ansobj = new Answer()

  document.querySelector(".answers").insertAdjacentHTML("beforeend",answer_elem);
  let this_ans = document.querySelector(`.answer${a}`);
  let a_del_rsn = res.data.delete_reasons.response;
  let answer_id = res.data.responses[a].id;
  this_ans.querySelector(".correction").addEventListener("click", function(){
    this_ans.querySelector(".delmenu").classList.remove("show");
    this_ans.querySelector(".afc").classList.toggle("show");

    this_ans.querySelector(".afc .confirmafc button").addEventListener("click", function(){
      ansobj.AllowCorrection((<HTMLInputElement>this_ans.querySelector(".afc textarea")).value, answer_id)
    })
  })
  this_ans.querySelector(".warns").innerHTML = `[${ans.user.warnings_count}]`
  this_ans.querySelector(".commentvis .commentnum").innerHTML = basic_data.comments.count;
  if(basic_data.comments.count > 0){
    this_ans.querySelector(".commentvis").addEventListener("click", function(){
      document.querySelector(".response-comments"+a).classList.toggle("open");
    })
  }
  if(basic_data.approved.approver !== null){
    this_ans.classList.add("approved");
    
    this_ans.querySelector(".unapprove").addEventListener("click", function(){
      ansobj.Unapprove(answer_id);
      this_ans.classList.remove("approved")
      this_ans.querySelector('.unapprove').remove();
      this_ans.classList.remove("reported")
      this_ans.classList.remove("AFCreported")
    })
  } else {
    this_ans.querySelector(".unapprove").remove()
    this_ans.querySelector(".approve").addEventListener("click", function(){
      ansobj.Approve(answer_id);
      this_ans.classList.add("approved")
      this_ans.classList.remove("reported")
      this_ans.classList.remove("AFCreported")
      this_ans.querySelector(".confirm").remove();
    })
  }
  if (res.data.responses[a].wrong_report){
    add_report(res.data.responses[a].wrong_report,basic_data, this_ans, "AFCReport")
  }
  this_ans.querySelector(".text-subj > div:nth-child(2)").innerHTML =  `${answerer.stats.answers} Answers`
  this_ans.querySelector(".time").innerHTML = get_time_diff(res.data.responses[a].created)

  user_content_data(answerer, this_ans, ans);
  add_attachments(ans, this_ans);
  add_comments(ans, users_data, res.data.delete_reasons.comment, "response", a)
  
  add_report(res,ans,this_ans,'UserReport');
  add_deletion(a_del_rsn, this_ans, answer_id, "response");
  this_ans.querySelector(".confirm").addEventListener("click", function(){
    ansobj.Confirm(answer_id);
    this_ans.classList.remove("reported");
    this_ans.classList.remove("AFCreported")
  })
  
  
}
async function add_question_data(res, d_reference, users_data, basic_data){
  let q_data = res.data.task;
  let q_elem = document.querySelector(".qdata");
  console.log(res);
  document.querySelector(".modal .title").insertAdjacentHTML("beforeend", /*html*/`
  <a href="https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/question/${q_data.id}" class="qlink" target = "_blank">#${q_data.id}</a>
  `);
  document.querySelector(".text-subj > div:nth-child(3)").innerHTML = d_reference.data.grades.find(({id}) => id === q_data.grade_id).name;
  document.querySelector(".text-subj > div:nth-child(2)").innerHTML = d_reference.data.subjects.find(({id}) => id === q_data.subject_id).name;
  document.querySelector(".text-subj > div:nth-child(1)").innerHTML = get_time_diff(q_data.created);

  q_elem.querySelector(".warns").innerHTML = `[${q_data.user.warnings_count}]`
  q_elem.querySelector(".ptsbox .text-points").innerHTML = "+" + q_data.points.ptsForResp;
  q_elem.querySelector(".commentvis .commentnum").innerHTML = basic_data.data.task.comments.count;
  if(basic_data.data.task.comments.count > 0){
    q_elem.querySelector(".commentvis").addEventListener("click", function(){
      document.querySelector(".task-comments").classList.toggle("open");
    })
  }
  let asker = res.users_data.find(({id}) => id === q_data.user.id);
  //let warnings = await get_warnings(asker.id)
  //console.log(warnings)

  let qobj = new Question()

  add_report(res, q_data, document.querySelector(".question"),"UserReport");
  user_content_data(asker, q_elem, q_data);
  add_attachments(q_data, q_elem);
  add_comments(q_data, users_data, res.data.delete_reasons.comment, "task");
  let q_del_rsn = res.data.delete_reasons.task;
  let q_id = res.data.task.id;
  add_deletion(q_del_rsn, q_elem, q_id, "task");
  q_elem.querySelector(".confirm").addEventListener("click", function(){
    qobj.Confirm(q_id);
    document.querySelector(".question").classList.remove("reported")
  })
  
}

function show_ticket(qid:string){
    document.body.insertAdjacentHTML("beforeend", <string>ticket())
    async function event(e) {
      document.removeEventListener("keydown", event); 
      if (e.key === 'Escape') {
        document.querySelector(".modal_back").remove()
        await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${qid},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
      }
    }
    document.addEventListener('keydown',event)
    document.querySelector(".modal_close").addEventListener("click", async function(){
      document.querySelector(".modal_back").remove()
      await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${qid},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
    });
     
}
export async function ticket_data(id, res, butspinner){

  let basic_data = await BrainlyAPI.GetQuestion(id)
  let d_reference = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_config/desktop_view`, {method: "GET"}).then(data => data.json());
  let log = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_task_lines/big/${id}`, {method: "GET"}).then(data => data.json());

  console.log(basic_data)
  
  show_ticket(id);
 
  document.querySelector(".blockint").remove();
  butspinner.classList.remove("show");
  let users_data = log.users_data
  
  await add_question_data(res,d_reference,users_data, basic_data);
  
  if(res.data.responses.length !== 0){
      document.querySelector(".answers").innerHTML = '';
      for(let a = 0; a < res.data.responses.length; a++){
          console.log(a);
          let this_ans_data = basic_data.data.responses[a];
          add_answer(res.data.responses[a],res, a, this_ans_data, log.users_data);
      }
  }
  else{
      document.querySelector(".noanswer").classList.add("show")
  }
  document.querySelector(".preview-content .sg-spinner-container").classList.add("remove");
  add_log(log);
}
