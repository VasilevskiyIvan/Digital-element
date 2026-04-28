import { ContactFormValidator } from "./ContactFormValidator";
import type { TContactFormValues, TFieldErrors } from "./ContactFormValidator";
import { domQuery } from "../dom/query";
import type { FormSender } from "../network/FormSender";
import type { Modal } from "../ui/Modal";
import type { Notification } from "../ui/Notification";

/**
 *
 */
export class ContactFormController {

  private readonly form: HTMLFormElement;

  private readonly modal: Modal;

  private readonly notification: Notification;

  private readonly sender: FormSender;

  private readonly validator = new ContactFormValidator();

  constructor(form: HTMLFormElement, modal: Modal, notification: Notification, sender: FormSender) {
    this.form = form;
    this.modal = modal;
    this.notification = notification;
    this.sender = sender;
  }

  public init() {
    this.form.addEventListener("submit", this.onSubmit);
  }

  private onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const values = this.getValues();
    const errors = this.validator.validate(values);
    this.renderErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const result = await this.sender.send(values);
    if (!result.ok) {
      this.notification.show("Failed to send the form");
      return;
    }

    this.notification.show("Your message successfully sent");
    this.form.reset();
    this.clearErrors();
    this.modal.close();
  };

  private getValues(): TContactFormValues {
    const formData = new FormData(this.form);
    return {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
  }

  private setFieldErrors(errors: TFieldErrors) {
    (Object.keys(errors) as Array<keyof TFieldErrors>).forEach((field) => {
      const message = errors[field];
      if (!message) {
        return;
      }
      const element = domQuery.byDataValue<HTMLElement>("field-error", field, this.form);
      if (element) {
        element.textContent = message;
      }
    });
  }

  private clearErrors() {
    domQuery.byDataAll<HTMLElement>("field-error", this.form).forEach((element) => {
      element.textContent = "";
    });
  }

  private renderFieldEmpty(field: keyof TContactFormValues) {
    const element = domQuery.byDataValue<HTMLElement>("field-error", field, this.form);
    if (element) {
      element.textContent = "";
    }
  }

  private clearFieldsWithoutErrors(errors: TFieldErrors) {
    ([ "name", "email", "message" ] as const).forEach((field) => {
      if (errors[field]) {
        return;
      }
      this.renderFieldEmpty(field);
    });
  }

  private renderErrors(errors: TFieldErrors) {
    this.clearFieldsWithoutErrors(errors);
    this.setFieldErrors(errors);
  }

}
