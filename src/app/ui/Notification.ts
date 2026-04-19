/**
 *
 */
export class Notification {

  private readonly element: HTMLElement;

  private hideTimeoutId: number | null = null;

  constructor() {
    this.element = document.createElement("div");
    this.element.className = "notification notification--hidden";
    document.body.appendChild(this.element);
  }

  public show(message: string, durationMs = 2500) {
    this.element.textContent = message;
    this.element.classList.remove("notification--hidden");

    if (this.hideTimeoutId) {
      window.clearTimeout(this.hideTimeoutId);
    }

    this.hideTimeoutId = window.setTimeout(() => {
      this.hide();
    }, durationMs);
  }

  public hide() {
    this.element.classList.add("notification--hidden");
  }

}

