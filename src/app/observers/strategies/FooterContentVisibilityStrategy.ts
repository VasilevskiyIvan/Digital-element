import type { IVisibilityStrategy } from "../types";

/**
 * Стратегия отображения контента футера
 * Делает footer__content видимым при пересечении
 */
export class FooterContentVisibilityStrategy implements IVisibilityStrategy {

  /**
   * Стратегия отображения контента футера
   * @param {HTMLElement | null} footerContent - элемент контента футера
   */
  constructor(private readonly footerContent: HTMLElement | null) { }

  /**
   * Проверка элемента для обработки
   * @param {HTMLElement} element - DOM элемент
   * @returns {boolean}
   */
  public shouldHandle(element: HTMLElement): boolean {
    return element.classList.contains("footer__content");
  }

  /**
   * Обработка пересечения
   * Добавляет класс видимости к футеру
   */
  public onIntersect(): void {
    this.footerContent?.classList.add("footer__content--visible");
  }

}