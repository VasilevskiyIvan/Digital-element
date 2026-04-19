/**
 *
 */
export class ScrollEffects {

  private scheduled = false;

  public init() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.update();
  }

  private onScroll = () => {
    if (this.scheduled) {
      return;
    }
    this.scheduled = true;

    requestAnimationFrame(() => {
      this.scheduled = false;
      this.update();
    });
  };

  private update() {
    const header = document.querySelector<HTMLElement>(".header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const contacts = document.querySelector<HTMLElement>(".contacts");

    if (header && hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const shouldScroll = window.scrollY > heroBottom - window.innerHeight / 10;
      header.classList.toggle("header--scrolled", shouldScroll);
    }

    if (contacts) {
      const top = contacts.getBoundingClientRect().top;
      contacts.classList.toggle("contacts--border-none", top <= window.innerHeight / 10);
    }
  }

}

