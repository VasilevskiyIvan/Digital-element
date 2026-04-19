export type TContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type TFieldErrors = Partial<Record<keyof TContactFormValues, string>>;

/**
 *
 */
export class ContactFormValidator {

  public validate(values: TContactFormValues): TFieldErrors {
    const errors: TFieldErrors = {};

    if (!values.name.trim()) {
      errors.name = "Поле обязательно к заполнению";
    }
    if (!values.email.trim()) {
      errors.email = "Поле обязательно к заполнению";
    } else if (!this.isEmail(values.email)) {
      errors.email = "Адрес некорректен";
    }

    if (!values.message.trim()) {
      errors.message = "Поле обязательно к заполнению";
    }

    return errors;
  }

  private isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

}
