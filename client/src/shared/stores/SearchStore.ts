import { createContext } from "react";
import { observable, action } from "mobx";

export class SearchStore {
  @observable spotlight: boolean = false;
  @action setSpotlight = (value: boolean) => {
    this.spotlight = value;
  };
}

export default createContext(new SearchStore());
