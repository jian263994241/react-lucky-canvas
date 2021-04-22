declare module 'lucky-canvas' {
  export class LuckyWheel {
    constructor(
      base: { el: string; width: string; height: string },
      options: any
    ) {}
    paly: () => void;
    stop: (index: number) => void;
    [prop: string]: any;
  }
  export class LuckyGrid {
    constructor(
      base: { el: string; width: string; height: string },
      options: any
    ) {}
    paly: () => void;
    stop: (index: number) => void;
    [prop: string]: any;
  }
}
