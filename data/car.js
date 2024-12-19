class Car {
  carNumber;
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = 'is closed';

  constructor (carDetails) {
    this.carNumber = carDetails.car;
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = carDetails.speed;
  }

  displayInfo() {
    // console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, trunk: ${this.isTrunkOpen}`)
  }

  go() {
    if (this.isTrunkOpen === 'is open') {
      return;
    } else {
      this.speed += 5;
    }
  }

  break() {
    this.speed -= 5;
  }

  openTrunk() {
    this.isTrunkOpen = 'is open'
  }

  closeTrunk() {
    this.isTrunkOpen = 'is closed';
  }
}


class RaceCar extends Car{
  acceleration;
  isTrunkOpen = 'does not have trunk';

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;
  }

  openTrunk() {
    this.isTrunkOpen = 'does not have trunk';
  }

  closeTrunk() {
    this.isTrunkOpen = 'does not have trunk';
  }
}

const cars = [
  {
    car: 'car1',
    speed: 40,
    brand: "Toyota",
    model: "Corolla"
  },
  {
    car: 'car2',
    speed: 30,
    brand: "Tesla",
    model: "Model 3"
  },
  {
    car: 'car3',
    speed: 60,
    brand: "Audi",
    model: "R8",
    
    type: 'raceCar',
    acceleration: 200
  },
  {
    car: 'car4',
    speed: 60,
    brand: "Lamborgini",
    model: "Exotic",

    type: 'raceCar',
    acceleration: 160
  }
].map((carDetails) => {
  if (carDetails.type === 'raceCar') {
    return new RaceCar(carDetails);
  }
  return new Car(carDetails);
});

cars[0].closeTrunk();
cars[0].go();
cars[0].go();
cars[0].go();
cars[0].displayInfo();
cars[1].displayInfo();

cars[2].go();
cars[2].displayInfo();