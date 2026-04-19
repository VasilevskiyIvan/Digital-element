export type TRevealOptions = {
  rootMargin?: string;
  threshold?: number;
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return; 
          }
          entry.target.classList.add(this.className);
          observer.unobserve(entry.target);
        });
      }, {
        threshold: this.options.threshold ?? 0,
        rootMargin: this.options.rootMargin ?? "0px",
      }
    );

    targets.forEach((target) => observer.observe(target));
  }

}