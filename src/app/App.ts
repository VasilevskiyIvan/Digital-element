import { HeroAnimations, FormOnScrollAnimator } from "./animations/scrollAnimations";
import { ScrollEffects } from "./behaviors/ScrollEffects";
import { domQuery } from "./dom/query";
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
    new IntersectionReveal('[data-js="feature-card"]', "feature-card--visible", {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
      forceAfterMs: 2000,
    }).init();

    const footer = domQuery.byDataJs<HTMLElement>("footer");
    const footerContent = domQuery.byDataJs<HTMLElement>("footer-content");

    new SectionsVisibility()
      .addElements([
        '[data-js="clients"]',
        '[data-js="cta"]',
        '[data-js="footer-content"]',
      ])
      .addStrategy(new AddBaseClassStrategy())
      .addStrategy(new FooterVisibilityStrategy(footer))
      .addStrategy(new FooterContentVisibilityStrategy(footerContent))
      .init({ threshold: 0.2, forceAfterMs: 2000 });

    this.initContactModal();
  }

  private initContactModal() {
    const modalRoot = domQuery.byDataValue<HTMLElement>("modal", "contact");
    if (!modalRoot) {
      return;
    }
    const modal = new Modal(modalRoot);
    modal.init();
    const openButton = domQuery.byDataJs<HTMLElement>("cta-open");
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

