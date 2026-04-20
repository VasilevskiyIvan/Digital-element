import { HeroAnimations, FormOnScrollAnimator } from "./animations/scrollAnimations";
import { ScrollEffects } from "./behaviors/ScrollEffects";
import { ContactFormController } from "./forms/ContactFormController";
import { FormSender } from "./network/FormSender";
import { AddBaseClassStrategy, FooterContentVisibilityStrategy, FooterVisibilityStrategy } from "./observers";
import { IntersectionReveal } from "./observers/IntersectionReveal";
import { SectionsVisibility } from "./observers/SectionsVisibility";
import { Modal } from "./ui/Modal";
import { Notification } from "./ui/Notification";

/**
 *
 */
export class App {

  public init() {
    new HeroAnimations().init();
    new FormOnScrollAnimator().init();
    new ScrollEffects().init();
    new IntersectionReveal(".feature-card", "feature-card--visible", {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
      forceAfterMs: 2000,
    }).init();

    const footer = document.querySelector<HTMLElement>(".footer");
    const footerContent = document.querySelector<HTMLElement>(".footer__content");

    new SectionsVisibility()
      .addElements([ ".clients", ".cta", ".footer__content" ])
      .addStrategy(new AddBaseClassStrategy())
      .addStrategy(new FooterVisibilityStrategy(footer))
      .addStrategy(new FooterContentVisibilityStrategy(footerContent))
      .init({ threshold: 0.2, forceAfterMs: 2000 });

    this.initContactModal();
  }

  private initContactModal() {
    const modalRoot = document.querySelector<HTMLElement>('[data-modal=\"contact\"]');
    if (!modalRoot) {
      return;
    }
    const modal = new Modal(modalRoot);
    modal.init();
    const openButton = document.querySelector<HTMLElement>(".cta__button");
    openButton?.addEventListener("click", () => modal.open());
    const form = modalRoot.querySelector<HTMLFormElement>("[data-contact-form]");
    if (!form) {
      return;
    }

    const notification = new Notification();
    const sender = new FormSender("/contact");
    new ContactFormController(form, modal, notification, sender).init();
  }

}

