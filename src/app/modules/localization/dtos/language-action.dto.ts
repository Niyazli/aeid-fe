export class LanguageActionDto {
  name: string;
  alpha2: string;
  constructor({name, alpha2}: LanguageActionDto) {
    this.name = name;
    this.alpha2 = alpha2;
  }
}
