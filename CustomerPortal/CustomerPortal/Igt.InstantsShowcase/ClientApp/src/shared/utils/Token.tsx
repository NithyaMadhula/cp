export class Token {
  constructor() {}

  private static value: string = "";

  public get value(): string {
    return Token.value;
  }
  public set value(v: string) {
    Token.value = v;
  }
}
