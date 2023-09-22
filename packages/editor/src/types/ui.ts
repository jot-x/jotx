/**
 * Types related to the UI
 */
export namespace JotxUI {
  // An HTML element
  export type Element = HTMLDivElement;

  // a css style
  export interface Style extends StyleModes {
    // the variable suffix
    suffix: string;
    // default value of the css rule
    default: string;
  }

  /**
   * overrides css value per mode
   */
  export interface StyleModes {
    light?: string;
    dark?: string;
  }
}

export default JotxUI;
