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

    const handledElements = new WeakSet<HTMLElement>();
    let observer: IntersectionObserver | null = null;

    const handleElement = (element: HTMLElement) => {
      if (handledElements.has(element)) {
        return;
      }
      handledElements.add(element);

      this.strategies.forEach((strategy) => {
        if (strategy.shouldHandle(element)) {
          strategy.onIntersect(element);
        }
      });

      observer?.unobserve(element);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return; 
          }
          if (!(entry.target instanceof HTMLElement)) {
            return; 
          }

          handleElement(entry.target);
        });
      }, {
        threshold: config.threshold ?? 0.2,
        rootMargin: config.rootMargin ?? "0px",
      }
    );

    this.elementsToObserve.forEach((element) => observer.observe(element));

    const forceAfterMs = config.forceAfterMs ?? 0;
    if (forceAfterMs > 0) {
      window.setTimeout(() => {
        this.elementsToObserve.forEach((element) => handleElement(element));
        observer?.disconnect();
      }, forceAfterMs);
    }
  }

}
