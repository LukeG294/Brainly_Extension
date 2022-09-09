export default new class Component{
    private button: Element;
    private icon: Element;
    Icon(
        name: "academic_cap" | "all_questions" | "answer" |  "arrow_double_down" | "arrow_down" | "arrow_left" | "arrow_right" | "arrow_up" | "ask_bubble" |"ask_parent_to_pay" | "attachment" | "bell_checked" | "bell_outlined" | "bold" | "bulleted_list" | "calendar" | "camera" | "chapter" | "check" | "clipboard" | "close" | "comment" | "comment_outlined" | "counter" | "credit_card" | "crown" | "crown_outlined" | "cup" | "equation" | "exclamation_mark" | "facebook" | "filters" | "friend_add" | 
        "friend_remove" | "friend_pending" | "friend_checked" | "friends" | "fullscreen" | "funnel" | "globe" | "heading" | "heart" | "heart_outlined" | "image" | "influence" | "info" | "instagram" | "italic" | "less" | "linkedin" | "lock_with_play" | "logout" |"medium" |"megaphone" |"menu" |"messages" |"mic" |"money_transfer" |"add_more" |"notifications" |"numbered_list" |"open_in_new_tab" | "padlock" |"pencil" |"play" |"plus" |"points" |"profile" |"profile_view" |"question" |"recent_questions"|
        "reload"|"report_flag"|"report_flag_outlined"| "rotate" | "rotate_90" | "search" | "seen" | "send" | "settings" | "share" | "shield" | "sms" | "star" | "star_half" | "star_half_outlined" | "star_outlined" | "subtitle" | "symbols" | "textbook" | "thumb_down" | "thumb_down_outlined" | "thumb_up" | "thumb_up_outlined" | "title" | "toughest_questions" | "trash" | "twitter" | "underlined" | "unseen" | "verified" | "warning" | "youtube" | "arrow_top_right" | "circle" | "crop" | "cyrillic" | 
        "draw" | "drawing_mode" | "european" | "greek" | "highlight" | "line" | "more" | "pause" | "rectangle" | "sup_sub" | "triangle" | "pi" | "quote" | "spark" | "dot" | "clear",
        size: "24" | "16"
    ){
        this.icon = document.createElement("span");
        this.icon.classList.add(`sg-button__icon--${size}`)
        this.icon.innerHTML = /*html*/`
        <div class="sg-icon sg-icon--adaptive sg-icon--x${size}">
            <svg class="sg-icon__svg">
                <use xlink:href="#icon-${name}"></use>
            </svg>
        </div>
        `
        return this.icon
    }
    Button(props:{
        size: "l" | "m" | "s",
        type: 'solid' | 'solid-inverted' | 'solid-indigo' | 'solid-indigo-inverted' | 'solid-light' | 'outline' | 'outline-indigo' | 'outline-inverted' | 'transparent' | 'transparent-light' | 'transparent-red' | 'transparent-inverted', 
        ClassNames?: string[],
        text?:string,
        color?: "peach" | "mustard" | "blue",
        icon?,
        id?: string,
        onClick?: () => void;
        iconSize?: "24" | "16",
        iconColor?: "peach" | "mustard" | "blue",
        Attributes?: {
            key: string,
            value: string
        }[]
    }
        ):Element{
        this.button = document.createElement("button");

        this.button.classList.add("sg-button", `sg-button--${props.size}`, `sg-button--${props.type}`)
        
        props.icon?{this:this.button.insertAdjacentElement("beforeend", this.Icon(props.icon, props.iconSize))}:{}

        props.text?{
            this:this.button.insertAdjacentHTML("beforeend", /*html*/`<span class="sg-button__text">${props.text}</span>`)
        }:{
            this:this.button.classList.add("icononly")
        }

        props.Attributes? {
            props: props.Attributes.forEach(attr => {
                this.button.setAttribute(attr.key, attr.value);
            })
        }:{}
        props.id?{this: this.button.id = props.id}:{}
        props.ClassNames?{this: this.button.classList.add(...props.ClassNames)}:{}
        props.onClick ? this.button.addEventListener("click", props.onClick):{};

        return this.button;
    }
}