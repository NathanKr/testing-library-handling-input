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
import * as functions from "../src/ui/main-ui";

let root: HTMLElement;

function initUi() {
  document.body.innerHTML = '<div id="app"></div>';
  createDom();
  registerHandlers();
  root = document.querySelector("#app")!;
}

function resetUi() {
  document.body.innerHTML = "";
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

test("load csv data -> number of grades : 3 appears in ui", async () => {
  // Text data
  const text = "John Deer , 80\nMike Tyson , 22\nBarak Obama , 100";

  // Encode the text as binary data (UTF-8 encoding)
  const encoder = new TextEncoder();
  const textAsBytes = encoder.encode(text);

  // Create an ArrayBuffer from the binary data
  const fileBits = [textAsBytes.buffer];

  const file = new File(fileBits, "grades.csv");
  const inputElem = getCsvInput();

  await userEvent.upload(inputElem, file);

  expect(inputElem.files![0]).toBe(file);
  await waitFor(() => {
    expect(getByRole(root, "status").textContent).toContain(
      "number of grades : 3"
    );
  });
});
