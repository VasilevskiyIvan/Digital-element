import { domQuery } from "../dom/query";
import { FormController } from "../forms/ContactFormController";
import { ContactFormValidator } from "../forms/ContactFormValidator";
import { FormSender } from "../network/FormSender";
import { Modal } from "../ui/Modal";
import { Notification } from "../ui/Notification";

/**
 * Функционал модального окна контактов
 * Инициализация формы, модалки и отправки данных
 */
export class ContactModalFeature {

  /**
   * Инициализация фичи
   * Находит элементы, создает зависимости и подключает обработчики
   */
  public init() {
    const modalRoot = domQuery.byDataValue<HTMLElement>("modal", "contact");
    if (!modalRoot) {
      return;
    }

    const openButton = domQuery.byDataJs<HTMLElement>("cta-open");
    if (!openButton) {
      return;
    }

    const form = modalRoot.querySelector<HTMLFormElement>("[data-contact-form]");
    if (!form) {
      return;
    }

    const modal = new Modal(modalRoot);
    modal.init();

    openButton.addEventListener("click", () => modal.open());

    const notification = new Notification();
    const sender = new FormSender("/contact");
    const validator = new ContactFormValidator();

    const controller = new FormController(
      form, modal, notification, sender, validator
    );

    controller.init();
  }

}