/* eslint-disable require-jsdoc */
export class Pump {
  #car = null;
  constructor(typeFuel, fillingSpeed) {
    this.typeFuel = typeFuel;
    this.fillingSpeed = fillingSpeed;
  }

  get car() {
    return this.#car;
  }

  set car(car) {
    this.#car = car;
  }
}
