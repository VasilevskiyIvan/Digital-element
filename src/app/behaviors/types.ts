export type TScrollContext = {
  scrollY: number;
  viewportHeight: number;
};

export type TScrollEffectsConfig = TScrollEffectsRule[];

export type TScrollEffectsRule = {
  target: string;
  toggleClass: string;
  when: (ctx: TScrollContext) => boolean;
};