import type { IFormValidator } from "./ContactFormController";

export type TContactFormValues = {
  name: string;
  email: string;
  message: string;
};

type TFieldErrors = Partial<Record<keyof TContactFormValues, string>>;

/**
 * Валидатор формы контактов
 * Проверяет обязательные поля и формат email
 */
export class ContactFormValidator implements IFormValidator<TContactFormValues> {

  /**
   * Проверка значений формы
   * @param {TContactFormValues} values - данные формы
   * @returns {TFieldErrors}
   */
  public validate(values: TContactFormValues): TFieldErrors {
    const errors: TFieldErrors = {};

    if (!values.name.trim()) {
      errors.name = "This field is required";
    }

    if (!values.email.trim()) {
      errors.email = "This field is required";
    } else if (!this.isEmail(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.message.trim()) {
      errors.message = "This field is required";
    }

    return errors;
  }

  private isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

}