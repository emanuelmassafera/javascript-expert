import NotImplementedException from "../not-implemented-exception.mjs";

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name)
  }
}
