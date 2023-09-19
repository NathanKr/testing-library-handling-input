import "./style.css";

export function getRoot(): HTMLElement {
  return document.querySelector<HTMLDivElement>("#app")!;
}

function getFirstInput() : number{
    return Number(getRoot().querySelectorAll('input')[0].value)
}

function getSecondInput() : number{
    return Number(getRoot().querySelectorAll('input')[1].value)
}

function getOutput() : HTMLElement{
    return getRoot().querySelector('output')!
}

export function createDom() {
  getRoot().innerHTML = `
    <div>
      <h1>handling input in testing library</h1>
      <label>Insert first number</label><input type='number'/>
      <br/>
      <label>Insert second number</label><input type='number'/>
      <br/>
      <button>Add</button>
      <br/>
      <output/>
    </div>
  `;
}

export function registerHandlers() {
  getRoot()
    .querySelector("button")
    ?.addEventListener("click", () => {
      const addResult = getFirstInput() + getSecondInput();
      getOutput().innerHTML = addResult.toString();
    });
}
