type TModalElements = {
  root: HTMLElement;
  overlay: HTMLElement | null;
  dialog: HTMLElement | null;
  close: HTMLElement | null;
};

/**
 *
 */
export class Modal {

  private readonly elements: TModalElements;

  private readonly bodyScrollLockClass = "is-scroll-locked";

  private readonly hiddenClass = "modal--hidden";

  constructor(root: HTMLElement) {
    this.elements = {
      root,
      overlay: root.querySelector<HTMLElement>("[data-modal-overlay]"),
      dialog: root.querySelector<HTMLElement>(".modal__dialog"),
      close: root.querySelector<HTMLElement>("[data-modal-close]"),
    };
  }

  public init() {
    this.elements.close?.addEventListener("click", () => this.close());
    this.elements.overlay?.addEventListener("click", () => this.close());
    this.elements.dialog?.addEventListener("click", this.stopEvent);
    document.addEventListener("keydown", this.onKeyDown);
  }

  public open() {
    this.elements.root.classList.remove(this.hiddenClass);
    this.elements.root.setAttribute("aria-hidden", "false");
    document.body.classList.add(this.bodyScrollLockClass);
  }

  public close() {
    this.elements.root.classList.add(this.hiddenClass);
    this.elements.root.setAttribute("aria-hidden", "true");
    document.body.classList.remove(this.bodyScrollLockClass);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }
    if (this.elements.root.classList.contains(this.hiddenClass)) {
      return;
    }
    this.close();
  };

  private stopEvent = (event: Event) => {
    event.stopPropagation();
  };

}
