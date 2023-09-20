import { test, expect, beforeEach, vi } from "vitest";
import {
  getAllByRole,
  getByRole,
  getByText,
  waitFor,
} from "@testing-library/dom";
import {
  createDom,
  getCsvInput,
  getRoot,
  registerHandlers,
} from "../src/ui/main-ui";
import userEvent from "@testing-library/user-event";
import fs from 'fs'

let root: HTMLElement;

function initUi() {
  document.body.innerHTML = '<div id="app"></div>';
  createDom();
  registerHandlers();
  root = document.querySelector("#app")!;
}



beforeEach(() => {
  initUi();
});

test("this text exist : handling input in testing library", () => {
  const elem = getByText(getRoot(), "handling input in testing library");
  expect(elem).toBeTruthy();
});

test("type number is ok", async () => {
  const user = userEvent.setup();
  // -- role spinbutton refer to input
  const firstInput = getAllByRole(root, "spinbutton")[0];
  await user.type(firstInput, "1");
  const secondInput = getAllByRole(root, "spinbutton")[1];
  await user.type(secondInput, "2");
  await user.click(getByText(root, "Add"));
  expect(getByRole(root, "status").textContent).toBe("3");
});

test("upload file via input with type element -> number of grades : 3 appears in ui", async () => {
  const fileName = "grades.csv";
  const csvFilePath = `./data/${fileName}`; // -- relative to the project root
  const data = fs.readFileSync(csvFilePath);
  
  // Create an ArrayBuffer from the binary data (Buffer)
  const fileBits = [data.buffer];
  
  const file = new File(fileBits, fileName);
  const inputElem = getCsvInput();

  // --- this cause the input element to upload
  await userEvent.upload(inputElem, file);

  expect(inputElem.files![0]).toBe(file);
  await waitFor(() => {
    expect(getByRole(root, "status").textContent).toBe(
      "number of grades : 3"
    );
  });
});
