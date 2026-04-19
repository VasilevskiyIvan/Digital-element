export interface IObserverConfig {
  threshold: number;
  rootMargin?: string;
}

export interface IVisibilityStrategy {
  shouldHandle(element: HTMLElement): boolean;
  onIntersect(element: HTMLElement): void;
}