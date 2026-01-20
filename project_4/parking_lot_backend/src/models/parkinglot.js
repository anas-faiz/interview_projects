const Floor = require("./Floor");

class ParkingLot {
  constructor(totalFloors, slotsPerFloor) {
    this.floors = [];

    for (let i = 1; i <= totalFloors; i++) {
      this.floors.push(new Floor(i, slotsPerFloor));
    }
  }

  findSlot(vehicleType) {
    for (let floor of this.floors) {
      const slot = floor.getAvailableSlot(vehicleType);
      if (slot) return { floor, slot };
    }
    return null;
  }
}

module.exports = ParkingLot;
