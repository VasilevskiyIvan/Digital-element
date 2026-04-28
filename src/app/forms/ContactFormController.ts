import { domQuery } from "../dom/query";
import type { FormSender } from "../network/FormSender";
import type { Modal } from "../ui/Modal";
import type { Notification } from "../ui/Notification";

export type TFieldErrors<T> = Partial<Record<keyof T, string>>;

export interface IFormValidator<T> {
  validate(values: T): TFieldErrors<T>;
}

/**
 *
 */
export class FormController<TValues extends Record<string, any>> {

  private readonly form: HTMLFormElement;
  private readonly modal: Modal;
  private readonly notification: Notification;
  private readonly sender: FormSender;
  private readonly validator: IFormValidator<TValues>;

  constructor(
    form: HTMLFormElement,
    modal: Modal,
    notification: Notification,
    sender: FormSender,
    validator: IFormValidator<TValues>
  ) {
    this.form = form;
    this.modal = modal;
    this.notification = notification;
    this.sender = sender;
    this.validator = validator;
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

  private getValues(): TValues {
    const formData = new FormData(this.form);
    return Object.fromEntries(formData.entries()) as TValues;
  }

  private setFieldErrors(errors: TFieldErrors<TValues>) {
    (Object.keys(errors) as Array<keyof TValues>).forEach((field) => {
      const message = errors[field];
      if (!message) return;

      const element = domQuery.byDataValue<HTMLElement>(
        "field-error",
        String(field),
        this.form
      );

      if (element) {
        element.textContent = message;
      }
    });
  }

  private clearErrors() {
    domQuery
      .byDataAll<HTMLElement>("field-error", this.form)
      .forEach((el) => (el.textContent = ""));
  }

  private renderFieldEmpty(field: keyof TValues) {
    const element = domQuery.byDataValue<HTMLElement>(
      "field-error",
      String(field),
      this.form
    );

    if (element) {
      element.textContent = "";
    }
  }

  private clearFieldsWithoutErrors(errors: TFieldErrors<TValues>) {
    (Object.keys(this.getValues()) as Array<keyof TValues>).forEach((field) => {
      if (errors[field]) return;
      this.renderFieldEmpty(field);
    });
  }

  private renderErrors(errors: TFieldErrors<TValues>) {
    this.clearFieldsWithoutErrors(errors);
    this.setFieldErrors(errors);
  }
}