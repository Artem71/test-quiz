import { makeAutoObservable } from "mobx"

class UserStore {
  private _name = ''

  constructor() {
    makeAutoObservable(this)
  }

  get name() {
    return this._name
  }

  public setName(name: string) {
    this._name = name
  }
}

export default new UserStore()