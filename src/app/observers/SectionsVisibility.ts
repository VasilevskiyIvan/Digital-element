import type { IObserverConfig, IVisibilityStrategy } from "./types";

/**
 *
 */
export class SectionsVisibility {

  private readonly strategies: IVisibilityStrategy[] = [];

  private readonly elementsToObserve: HTMLElement[] = [];

  public addElement(element: HTMLElement | string): this {
    const targetElement = typeof element === "string"
      ? document.querySelector<HTMLElement>(element)
      : element;

    if (targetElement) {
      this.elementsToObserve.push(targetElement);
    }

    return this;
  }

  public addElements(elements: (HTMLElement | string)[]): this {
    elements.forEach((el) => this.addElement(el));
    return this;
  }

  public addStrategy(strategy: IVisibilityStrategy): this {
    this.strategies.push(strategy);
    return this;
  }

  public init(config: Partial<IObserverConfig> = {}): void {
    if (this.elementsToObserve.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return; 
          }
          if (!(entry.target instanceof HTMLElement)) {
            return; 
          }

          const element = entry.target;

          this.strategies.forEach((strategy) => {
            if (strategy.shouldHandle(element)) {
              strategy.onIntersect(element);
            }
          });

          observer.unobserve(element);
        });
      }, {
        threshold: config.threshold ?? 0.2,
        rootMargin: config.rootMargin ?? "0px",
      }
    );

    this.elementsToObserve.forEach((element) => observer.observe(element));
  }

}