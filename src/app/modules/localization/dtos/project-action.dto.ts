export class ProjectActionDto {
  name: string;
  origin: string;
  constructor({name, origin}: ProjectActionDto) {
    this.name = name;
    this.origin = origin;
  }
}
