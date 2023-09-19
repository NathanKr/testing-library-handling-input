import UiClass from "../types/e-ui-class";

export function getElementByClass(
  container: HTMLElement,
  className: UiClass
): HTMLElement {
  return container.querySelector(`.${className}`)!;
}
