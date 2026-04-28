import { domQuery } from "../dom/query";

type TModalElements = {
  root: HTMLElement;
  overlay: HTMLElement | null;
  dialog: HTMLElement | null;
  close: HTMLElement | null;
};

/**
 * Модальное окно
 * Управляет открытием, закрытием и блокировкой скролла
 */
export class Modal {

  private readonly elements: TModalElements;

  private readonly bodyScrollLockClass = "is-scroll-locked";

  private readonly hiddenClass = "modal--hidden";

  /**
   * Корневой элемент модального окна
   * @param {HTMLElement} root - корневой элемент модалки
   */
  constructor(root: HTMLElement) {
    this.elements = {
      root,
      overlay: domQuery.byAttr<HTMLElement>("data-modal-overlay", root),
      dialog: domQuery.byAttr<HTMLElement>("data-modal-dialog", root),
      close: domQuery.byAttr<HTMLElement>("data-modal-close", root),
    };
  }

  /**
   * Инициализация модального окна
   * Подключает обработчики событий
   */
  public init() {
    this.elements.close?.addEventListener("click", () => this.close());
    this.elements.overlay?.addEventListener("click", () => this.close());
    this.elements.dialog?.addEventListener("click", this.stopEvent);
    document.addEventListener("keydown", this.onKeyDown);
  }

  /**
   * Открытие модального окна
   * Показывает модалку и блокирует скролл страницы
   */
  public open() {
    this.elements.root.classList.remove(this.hiddenClass);
    this.elements.root.setAttribute("aria-hidden", "false");
    document.body.classList.add(this.bodyScrollLockClass);
  }

  /**
   * Закрытие модального окна
   * Скрывает модалку и разблокирует скролл страницы
   */
  public close() {
    this.elements.root.classList.add(this.hiddenClass);
    this.elements.root.setAttribute("aria-hidden", "true");
    document.body.classList.remove(this.bodyScrollLockClass);
  }

  /**
   * Обработка нажатия клавиши
   * Закрывает модалку по Escape
   * @param {KeyboardEvent} event - событие клавиатуры
   */
  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }

    if (this.elements.root.classList.contains(this.hiddenClass)) {
      return;
    }

    this.close();
  };

  /**
   * Остановка всплытия события
   * @param {Event} event - DOM событие
   */
  private stopEvent = (event: Event) => {
    event.stopPropagation();
  };

}