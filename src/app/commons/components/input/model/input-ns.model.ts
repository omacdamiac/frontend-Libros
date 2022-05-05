export namespace InputNsModel {
  export interface InputInt {
    text: string;
    place: string;
    required: boolean;
    name: string;
    type: string;
    readonly?: boolean;
    rows?: string;
    value?: string;
  }
  /**
        @param text: string
        @param place: string
        @param required: boolean
        @param name: string
        @param type: string
        @param readonly: boolean
        @param rows: string
        @param value: string
     */

  export class InputClass {
    text: string;
    place: string;
    required: boolean;
    name: string;
    type: string;
    readonly?: boolean;
    rows?: string;
    value?: string;

    constructor(
      textp: string,
      placep: string,
      required: boolean,
      namep: string,
      typep: string,
      readonlyp: boolean = false,
      rowsp?: string,
      valuep?: string
    ) {
      this.text = textp;
      this.place = placep;
      this.required = required;
      this.name = namep;
      this.type = typep;
      this.readonly = readonlyp;
      this.rows = rowsp;
      this.value = valuep;
    }
  }
}
