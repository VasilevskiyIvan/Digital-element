import type { IVisibilityStrategy } from "../types";

/**
 * Стратегия отображения футера
 * Добавляет класс видимости к футеру при пересечении
 */
export class FooterVisibilityStrategy implements IVisibilityStrategy {

  /**
   * Стратегия отображения футера
   * @param {HTMLElement | null} footer - элемент футера
   */
  constructor(private readonly footer: HTMLElement | null) { }

  /**
   * Проверка элемента для обработки
   * @param {HTMLElement} element - DOM элемент
   * @returns {boolean}
   */
  public shouldHandle(element: HTMLElement): boolean {
    return element.classList.contains("clients");
  }

  /**
   * Обработка пересечения
   * Делает футер видимым
   */
  public onIntersect(): void {
    this.footer?.classList.add("footer--visible");
  }

}