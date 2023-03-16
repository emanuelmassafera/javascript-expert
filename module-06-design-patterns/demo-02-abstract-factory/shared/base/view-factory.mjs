import NotImplementedException from "../not-implemented-exception.mjs";

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}
