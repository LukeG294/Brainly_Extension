
export async function insert_request_ban(){
    let button = `<button style="margin-bottom:12px" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach request-ban"><span class="sg-button__icon sg-button__icon--m">
    <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-3qxpca" focusable="false"><text id="title-heart-3qxpca" hidden="">heart</text>
        <use xlink:href="#icon-trash" aria-hidden="true"></use>
      </svg></div>
  </span><span class="sg-button__text">Request Ban</span></button>`

    document.querySelector('.personal_info').insertAdjacentHTML("beforeend", button);
    document.querySelector('.request_ban').addEventListener("click", function(){

    })
}