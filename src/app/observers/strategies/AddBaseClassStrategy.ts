import type { IVisibilityStrategy } from "../types";

/**
 * Стратегия добавления базового класса видимости
 * Добавляет модификатор --visible к первому классу элемента
 */
export class AddBaseClassStrategy implements IVisibilityStrategy {

  /**
   * Проверка возможности обработки элемента
   * @param {HTMLElement} element - DOM элемент
   * @returns {boolean}
   */
  public shouldHandle(element: HTMLElement): boolean {
    return !!element.classList[0];
  }

  /**
   * Обработка появления элемента во viewport
   * Добавляет класс вида baseClass--visible
   * @param {HTMLElement} element - DOM элемент
   */
  public onIntersect(element: HTMLElement): void {
    const baseClass = element.classList[0];
    element.classList.add(`${baseClass}--visible`);
  }

}