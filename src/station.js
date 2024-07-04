/* eslint-disable require-jsdoc */
import {Pump} from './pump.js';
import {RenderStation} from './renderStation.js';

export class Station {
  #queue = [];
  #pumps = [];
  #ready = [];
  constructor(stationsData, renderApp = null) {
    this.stationsData = stationsData;
    this.renderedApp = renderApp;
    this.renderStation = null;
  }

  get pumps() {
    return this.#pumps;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    this.createStation();

    setInterval(() => {
      this.checkQueue();
    }, 2000);
  }

  checkQueue() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#pumps.length; j++) {
          if (!this.#pumps[j].car &&
          this.#queue[i].typeFuel === this.#pumps[j].typeFuel) {
            this.#pumps[j].car = this.#queue.splice(i, 1)[0];
            this.filingStart(this.#pumps[j]);
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }

  createStation() {
    for (const stationData of this.stationsData) {
      stationData.count = stationData.count ? stationData.count : 1;
      stationData.fillingSpeed = stationData.fillingSpeed ?
        stationData.fillingSpeed : 5;

      for (let i = 0; i < stationData.count; i++) {
        this.#pumps.push(new Pump(
          stationData.typeFuel,
          stationData.fillingSpeed,
        ));
      }
    }

    if (this.renderedApp) {
      this.renderStation = new RenderStation(this.renderedApp, this);
    }
  }

  filingStart(pump) {
    const car = pump.car;
    let petrolInCar = car.nowTank;
    const requiredPetrol = car.needPetrol;

    const timerId = setInterval(() => {
      if ((petrolInCar + pump.fillingSpeed) <= car.maxTank) {
        petrolInCar += pump.fillingSpeed;
      } else {
        petrolInCar += car.maxTank - petrolInCar;
      }

      if (petrolInCar === car.maxTank) {
        clearInterval(timerId);
        pump.car = null;
        this.leaveClient({car, requiredPetrol});
      }
    }, 1000);

    console.log(`Начало заправки авто ${JSON.stringify(pump.car)}`);
  }

  leaveClient({car, requiredPetrol}) {
    this.#ready.push(car);
    console.log(car.getTitle(), requiredPetrol);
    this.renderStation.renderStation();
  }

  addCarToQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}

