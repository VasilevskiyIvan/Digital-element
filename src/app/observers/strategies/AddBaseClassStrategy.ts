import type { IVisibilityStrategy } from "../types";

/**
 *
 */
export class AddBaseClassStrategy implements IVisibilityStrategy {

  shouldHandle(element: HTMLElement): boolean {
    return !!element.classList[0];
  }

  onIntersect(element: HTMLElement): void {
    const baseClass = element.classList[0];
    element.classList.add(`${baseClass}--visible`);
  }

}