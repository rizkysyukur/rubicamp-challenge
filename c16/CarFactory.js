class Car{
  constructor(door, year, color, fuel, seat, machine, tyre){
    this.door = door;
    this.year = year;
    this.color = color;
    this.fuel = fuel;
    this.seat = seat;
    this.machine = machine;
    this.tyre = new Tyre(tyre);
  }
  moveForward(){}
  brake(){}
  backwards(){}
}

class Tyre{
  constructor(tyre){
    this.tyre = tyre;
  }
}

class Avanza extends Car{
  constructor(){
    super(5, "", "white", "premium/pertamax", 7, "1300 cc", "dunlop");
    this.brand = "Toyota Avanza Veloz";
    this.waranty = null;
  }
}

class Camry extends Car{
  constructor(){
    super(4, "", "white", "premium/pertamax", 5, "2494 cc", "dunlop");
    this.brand = "Toyota Camry";
    this.waranty = null;
  }
}

class Corolla extends Car{
  constructor(){
    super(4, "", "silver", "premium/pertamax", 5, "1798 cc", "dunlop");
    this.brand = "Toyota Corolla Altis";
    this.waranty = null;
  }
}

class Nav1 extends Car{
  constructor(){
    super(4, "", "grey", "premium/pertamax", 7, "1787 cc", "dunlop");
    this.brand = "Toyota Nav1";
    this.waranty = null;
  }
}

class CarFactory{
  cunstructor(cars = []){
    this.allcars = cars;
  }
  produce(m){
    let cars = [];
    let amount, car;
    let brand = ["avanza", "camry", "corolla", "nav1"];
    for (let i = 0; i < brand.length; i++) {
      amount = 10 * Math.random();
      car = [];
      switch (brand[i]) {
        case "avanza":
        for (let j = 0; j < amount; j++)
        car[j] = new Avanza();
        break;
        case "camry":
        for (let j = 0; j < amount; j++)
        car[j] = new Camry();
        break;
        case "corolla":
        for (let j = 0; j < amount; j++)
        car[j] = new Corolla();
        break;
        default:
        for (let j = 0; j < amount; j++)
        car[j] = new Nav1();
        break
      }
      cars.push(car);
      cars["month"] = m;
    }
    this.allcars.push(cars);
  }

  simulationWaranty(){
    month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  }
}

    let showResult = (allcars) => {
      for (var i = 0; i < allcars.length; i++) {
        console.log(`Hasil produksi bulan ${allcars[i]["month"]}, yaitu :`);
        for (let j = 0; j < allcars[i].length; j++) {
          console.log(`${allcars[i][j].length} unit : ${allcars[i][j][0].brand}`);
        }
        console.log();
      }





    }

    let c = new CarFactory();
    c.produce("Januari");
    c.produce("Februari");
    c.produce("Maret");
    showResult(c.allcars);
