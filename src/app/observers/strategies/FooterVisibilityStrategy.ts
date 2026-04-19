import type { IVisibilityStrategy } from "../types";

/**
 *
 */
export class FooterVisibilityStrategy implements IVisibilityStrategy {

  constructor(private readonly footer: HTMLElement | null) { }

  shouldHandle(element: HTMLElement): boolean {
    return element.classList.contains("clients");
  }

  onIntersect(): void {
    this.footer?.classList.add("footer--visible");
  }

}