import { backOut, elasticOut, power2Out } from "./easings";
import { tween } from "./tween";

const setOpacity = (element: HTMLElement, value: number) => {
  element.style.opacity = String(value);
};

const setTranslateX = (element: HTMLElement, valuePx: number) => {
  element.style.transform = `translateX(${valuePx}px)`;
};

const setTranslateY = (element: HTMLElement, valuePx: number) => {
  element.style.transform = `translateY(${valuePx}px)`;
};

const setScale = (element: HTMLElement, value: number) => {
  element.style.transform = `scale(${value})`;
};

const parsePx = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};


/**
 *
 */
export class FormOnScrollAnimator {

  private formShown = false;

  private form: HTMLElement | null = null;

  public init() {
    this.form = document.querySelector<HTMLElement>(".form-container");
    if (!this.form) {
      return;
    }

    window.addEventListener("scroll", this.onScroll, { passive: true });
  }

  private onScroll = () => this.handleScroll();

  private handleScroll() {
    if (window.scrollY <= 200 || this.formShown) {
      return;
    }
    if (!this.form) {
      return;
    }

    this.formShown = true;

    const computed = window.getComputedStyle(this.form);
    const startBottom = parsePx(computed.bottom);
    const easing = elasticOut(1, 0.5);

    void tween({
      durationMs: 1200,
      easing,
      onUpdate: (progress) => {
        const value = startBottom + (0 - startBottom) * progress;
        if (!this.form) {
          return;
        }
        this.form.style.bottom = `${value}px`;
      },
      onComplete: () => {
        if (!this.form) {
          return;
        }
        this.form.style.bottom = "0px";
      },
    });
  }

}

/**
 *
 */
export class HeroAnimations {

  public init() {
    const h1 = document.querySelector<HTMLElement>(".hero__left h1");
    const paragraph = document.querySelector<HTMLElement>(".hero__left p");
    const button = document.querySelector<HTMLElement>(".hero__button");

    const bg = document.querySelector<HTMLElement>(".hero__bg");
    const screen = document.querySelector<HTMLElement>(".hero__screen");
    const man = document.querySelector<HTMLElement>(".hero__man");
    const woman = document.querySelector<HTMLElement>(".hero__woman");
    const icons = Array.from(document.querySelectorAll<HTMLElement>(".hero__icon"));

    if (!h1 || !paragraph || !button || !bg || !screen || !man || !woman) {
      return;
    }

    setOpacity(h1, 0);
    setTranslateY(h1, 30);

    setOpacity(paragraph, 0);
    setTranslateY(paragraph, 30);

    setOpacity(button, 0);

    setOpacity(bg, 0);

    setOpacity(screen, 0);
    setTranslateX(screen, 200);

    setOpacity(man, 0);
    setTranslateX(man, -100);

    setOpacity(woman, 0);
    setTranslateX(woman, 100);

    icons.forEach((icon) => {
      setOpacity(icon, 0);
      setScale(icon, 1);
    });

    void this.playTimeline({
      h1,
      paragraph,
      button,
      bg,
      screen,
      man,
      woman,
      icons,
    });
  }

  private async playTimeline(elements: {
    h1: HTMLElement;
    paragraph: HTMLElement;
    button: HTMLElement;
    bg: HTMLElement;
    screen: HTMLElement;
    man: HTMLElement;
    woman: HTMLElement;
    icons: HTMLElement[];
  }) {
    const tasks: Array<Promise<void>> = [];

    tasks.push(this.runAt(0, () => this.animateOpacityTranslateY(elements.h1, 0, 1, 30, 0, 1000, power2Out)));
    tasks.push(this.runAt(500, () => this.animateOpacityTranslateY(elements.paragraph, 0, 1, 30, 0, 800, power2Out)));
    tasks.push(this.runAt(900, () => this.animateOpacity(elements.button, 0, 1, 600, power2Out)));

    const back08 = backOut(0.8);
    tasks.push(this.runAt(1200, () => this.animateOpacity(elements.bg, 0, 1, 1000, back08)));

    tasks.push(this.runAt(1900, () => this.animateOpacityTranslateX(elements.screen, 0, 1, 200, 0, 500, back08)));
    tasks.push(this.runAt(1900, () => this.animateOpacityTranslateX(elements.man, 0, 1, -100, 0, 900, back08)));
    tasks.push(this.runAt(2300, () => this.animateOpacityTranslateX(elements.woman, 0, 1, 100, 0, 900, back08)));

    const back2 = backOut(2);
    elements.icons.forEach((icon, index) => {
      tasks.push(this.runAt(2900 + index * 150, () => this.animateOpacity(icon, 0, 1, 600, back2)));
    });

    await Promise.all(tasks);
  }

  private runAt(startMs: number, fn: () => Promise<void>) {
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        void fn().then(resolve);
      }, startMs);
    });
  }

  private animateOpacity(element: HTMLElement, from: number, to: number, durationMs: number, easing: (t: number) => number) {
    return tween({
      durationMs,
      easing,
      onUpdate: (progress) => {
        const value = from + (to - from) * progress;
        setOpacity(element, value);
      },
    });
  }

  private animateOpacityTranslateY(
    element: HTMLElement,
    fromOpacity: number,
    toOpacity: number,
    fromY: number,
    toY: number,
    durationMs: number,
    easing: (t: number) => number
  ) {
    return tween({
      durationMs,
      easing,
      onUpdate: (progress) => {
        const opacity = fromOpacity + (toOpacity - fromOpacity) * progress;
        const y = fromY + (toY - fromY) * progress;
        setOpacity(element, opacity);
        setTranslateY(element, y);
      },
    });
  }

  private animateOpacityTranslateX(
    element: HTMLElement,
    fromOpacity: number,
    toOpacity: number,
    fromX: number,
    toX: number,
    durationMs: number,
    easing: (t: number) => number
  ) {
    return tween({
      durationMs,
      easing,
      onUpdate: (progress) => {
        const opacity = fromOpacity + (toOpacity - fromOpacity) * progress;
        const x = fromX + (toX - fromX) * progress;
        setOpacity(element, opacity);
        setTranslateX(element, x);
      },
    });
  }

}