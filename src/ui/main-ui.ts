import { parseCSV } from "../logic/utils";
import UiClass from "../types/e-ui-class";
import "./style.css";
import { getElementByClass } from "./utils";

export function getRoot(): HTMLElement {
  return document.querySelector<HTMLDivElement>("#app")!;
}

function getAddNumber1(): number {
  const input1 = getElementByClass(getRoot(), UiClass.add1) as HTMLInputElement;
  return Number(input1.value);
}

function getAddNumber2(): number {
  const input1 = getElementByClass(getRoot(), UiClass.add2) as HTMLInputElement;
  return Number(input1.value);
}

function getAddButton(): HTMLButtonElement {
  return getElementByClass(getRoot(), UiClass.add) as HTMLButtonElement;
}

function getOutput(): HTMLElement {
  return getRoot().querySelector("output")!;
}

function getCsvInput(): HTMLInputElement {
  return getElementByClass(getRoot(), UiClass.csvFile) as HTMLInputElement;
}

export function createDom() {
  getRoot().innerHTML = `
    <div>
      <h1>handling input in testing library</h1>
      <label>Insert first number</label><input class=${UiClass.add1} type='number'/>
      <br/>
      <label>Insert second number</label><input class=${UiClass.add2} type='number'/>
      <br/>
      <button class=${UiClass.add}>Add</button>
      <br/>
      <label>Insert csv grade file</label><input class=${UiClass.csvFile} type="file"/>
      <br/>
      <output/>
    </div>
  `;
}

export function registerHandlers() {
  // --- register add button click handler
  getAddButton().addEventListener("click", () => {
    const addResult = getAddNumber1() + getAddNumber2();
    getOutput().innerHTML = addResult.toString();
  });

  // --- register input file change handler
  getCsvInput().addEventListener("change", handleFile);
}

function handleFile(e: Event) {
  const fileInput = e.target as HTMLInputElement;
  const file = fileInput.files![0];
  const reader = new FileReader();

  reader.onload = function (event: ProgressEvent<FileReader>) {
    const csvData = event.target!.result as string;
    const grades = parseCSV(csvData);

    if (grades.length > 0) {
      getOutput().innerText =
        grades.length > 0
          ? `number of grades : ${grades.length}`
          : "No data found in the CSV file.";
    }
  };

  reader.readAsText(file);
}
