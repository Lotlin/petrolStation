/* eslint-disable require-jsdoc */
export class RenderStation {
  constructor(app, station) {
    this.app = app;
    this.station = station;
    this.init();
  }

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(100px, 1fr);
      align-items: top;
      justify-content: space-between;
    `;

    this.renderStation();
  }

  renderStation() {
    this.wrapper.textContent = '';

    const queueList = this.createQueue();
    const pumps = this.createPumps();
    this.wrapper.append(queueList, pumps);

    document.querySelector(this.app).append(this.wrapper);
  }

  createQueue() {
    const queueList = document.createElement('ul');

    this.station.queue.forEach(carInQueue => {
      const queueItem = document.createElement('li');
      queueItem.textContent = `${carInQueue.getTitle()}`;
      queueItem.classList.add(carInQueue.typeCar);
      queueList.append(queueItem);
    });

    return queueList;
  }

  createPumps() {
    const pumpsList = document.createElement('ul');
    pumpsList.classList.add('pumps');

    this.station.pumps.forEach(pump => {
      const pumpItem = document.createElement('li');
      pumpItem.classList.add(pump.typeFuel);

      const pumpTitle = document.createElement('p');
      pumpTitle.textContent = pump.typeFuel;

      pumpItem.append(pumpTitle);

      if (pump.car) {
        const itemCar = document.createElement('p');
        itemCar.textContent = pump.car.getTitle();
        itemCar.classList.add(pump.car.typeCar);
        pumpItem.append(itemCar);
      }

      pumpsList.append(pumpItem);
    });

    return pumpsList;
  }
}
