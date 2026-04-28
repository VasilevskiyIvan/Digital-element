import type { IFormValidator } from "./ContactFormController";

export type TContactFormValues = {
  name: string;
  email: string;
  message: string;
};

type TFieldErrors = Partial<Record<keyof TContactFormValues, string>>;

/**
 *
 */
export class ContactFormValidator implements IFormValidator<TContactFormValues> {

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
