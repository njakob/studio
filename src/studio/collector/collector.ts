export class Collector {
  tags = [] as JSX.Element[];

  addTag(element: JSX.Element) {
    this.tags.push(element);
  }
}
