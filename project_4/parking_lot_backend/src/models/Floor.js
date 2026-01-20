const Slot = require("./slot");

class Floor {
  constructor(floorNumber, slotConfig) {
    this.floorNumber = floorNumber;
    this.slots = [];

    let slotNumber = 1;
    for (let type in slotConfig) {
      for (let i = 0; i < slotConfig[type]; i++) {
        this.slots.push(new Slot(slotNumber++, type));
      }
    }
  }

  getAvailableSlot(vehicleType) {
    return this.slots.find(
      (slot) => slot.type === vehicleType && !slot.isOccupied
    );
  }
}

module.exports = Floor;
