/**
 * Конфигурация IntersectionObserver
 */
export interface IObserverConfig {
  /**
   * Порог срабатывания наблюдателя
   */
  threshold: number;

  /**
   * Отступ области наблюдения
   */
  rootMargin?: string;

  /**
   * Принудительное срабатывание через время
   */
  forceAfterMs?: number;
}

/**
 * Стратегия обработки видимости элемента
 */
export interface IVisibilityStrategy {

  /**
   * Проверка возможности обработки элемента
   * @param {HTMLElement} element - DOM элемент
   * @returns {boolean}
   */
  shouldHandle(element: HTMLElement): boolean;

  /**
   * Действие при появлении элемента
   * @param {HTMLElement} element - DOM элемент
   */
  onIntersect(element: HTMLElement): void;
}