import { createContext } from "react";
import { observable, action } from "mobx";

export class OverlayStore {
  @observable spotlight: boolean = false;
  @action setSpotlight = (value: boolean) => {
    this.spotlight = value;
  };

  @observable drawer: boolean = false;
  @action setDrawer = (value: boolean) => {
    this.drawer = value;
  };
}

export default createContext(new OverlayStore());
