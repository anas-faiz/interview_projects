// src/models/Ticket.js
class Ticket {
  constructor(floor, slot, vehicle) {
    this.ticketId = `PARK_${floor.floorNumber}_${slot.slotNumber}_${Date.now()}`;
    this.floor = floor.floorNumber;
    this.slot = slot.slotNumber;
    this.vehicle = vehicle;
    this.entryTime = new Date();
  }
}

module.exports = Ticket;
