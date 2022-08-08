export function PreparePage() {
  document.querySelector("html").insertAdjacentHTML("afterbegin", `
    <div id="app"></div>`);
}