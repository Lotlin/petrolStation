import './style.css';
import {Truck, PassangerCar} from './modules/car.js';
import {Station} from './station.js';

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450, 'gaz'],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700, 'gaz'],
    ['Volvo', 'FMX', 540, 'gaz'],
  ],
};

const getTestCar = () => {
  const typeBool = Math.random() < 0.6;
  const listCar = typeBool ? testArray.passangerCar : testArray.truck;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return typeBool ? new PassangerCar(...randomCar) : new Truck(...randomCar);
};

const station = new Station([
  {
    typeFuel: 'petrol',
    count: 3,
  },
  {
    typeFuel: 'diesel',
    fillingSpeed: 20,
    count: 2,
  },
  {
    typeFuel: 'gaz',
    fillingSpeed: 20,
  },
], '.app');

open.addEventListener('click', () => {
  station.init();
  console.log(station);
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    station.addCarToQueue(getTestCar());
  });
});
