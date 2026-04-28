import { domQuery } from "../dom/query";
import { ContactFormController } from "../forms/ContactFormController";
import { FormSender } from "../network/FormSender";
import { Modal } from "../ui/Modal";
import { Notification } from "../ui/Notification";

export class ContactModalFeature {

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
    new ContactFormController(form, modal, notification, sender).init();
  }

}

