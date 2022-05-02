export async function PreparePage() {
    document.body.innerHTML = `
      <div id="app"></div>
    `;
    document.title = 'Brainly Companion'
    document.body.id = "brainly-companion";
}