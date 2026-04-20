export type TRevealOptions = {
  rootMargin?: string;
  threshold?: number;
  forceAfterMs?: number;
};

/**
 *
 */
export class IntersectionReveal {

  constructor(
    private readonly targetSelector: string,
    private readonly className: string,
    private readonly options: TRevealOptions = {}
  ) { }

  public init(): void {
    const targets = document.querySelectorAll<HTMLElement>(this.targetSelector);
    if (targets.length === 0) {
      return; 
    }

    const revealTarget = (target: HTMLElement) => {
      target.classList.add(this.className);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return; 
          }
          revealTarget(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      }, {
        threshold: this.options.threshold ?? 0,
        rootMargin: this.options.rootMargin ?? "0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    const forceAfterMs = this.options.forceAfterMs ?? 0;
    if (forceAfterMs > 0) {
      window.setTimeout(() => {
        targets.forEach((target) => revealTarget(target));
        observer.disconnect();
      }, forceAfterMs);
    }
  }

}
