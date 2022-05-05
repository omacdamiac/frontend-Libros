export namespace ButtonNsModel {
  export interface ButtonInt {
    texto: string;
    color: string;
    type?: string;
    disabled?: boolean;
  }
  /**
      @param texto: string
      @param color: string
      @param type?: string
      @param disabled?: boolean
    */

  export class ButtonClass {
    texto: string;
    color: string;
    type: string;
    disabled?: boolean;

    constructor(
      textop: string,
      colorp: string,
      typep: string = '',
      disabledp: boolean = false
    ) {
      this.texto = textop;
      this.color = colorp;
      this.type = typep;
      this.disabled = disabledp;
    }
  }
}
