export async function PreparePage() {
    document.body.innerHTML = `
      <div id="app"></div>
    `;
    document.body.id = "brainly-companion";
  }