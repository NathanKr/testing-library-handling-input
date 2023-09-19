import { test, expect, beforeEach } from "vitest";
import { getAllByRole, getByRole, getByText } from "@testing-library/dom";
import { createDom, getRoot, registerHandlers } from "../src/ui/main-ui";
import userEvent from "@testing-library/user-event";

let root: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
  createDom();
  registerHandlers();
  root = document.querySelector("#app")!;
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
