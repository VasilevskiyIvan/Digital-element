export type TAnimationConfig = TAnimationConfigRule[];

export type TAnimationConfigRule = {
  selector: string;
  from: TTransformState;
  to: TTransformState;
  delay: number;
  duration: number;
  easing: (t: number) => number;
  multiple?: boolean;
  stagger?: number;
};

export type TTransformState = {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
};