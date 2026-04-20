export interface IObserverConfig {
  threshold: number;
  rootMargin?: string;
  forceAfterMs?: number;
}

export interface IVisibilityStrategy {
  shouldHandle(element: HTMLElement): boolean;
  onIntersect(element: HTMLElement): void;
}
