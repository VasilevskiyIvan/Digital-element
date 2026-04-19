import type { IVisibilityStrategy } from "../types";

/**
 *
 */
export class FooterContentVisibilityStrategy implements IVisibilityStrategy {

  constructor(private readonly footerContent: HTMLElement | null) { }

  shouldHandle(element: HTMLElement): boolean {
    return element.classList.contains("footer__content");
  }

  onIntersect(): void {
    this.footerContent?.classList.add("footer__content--visible");
  }

}