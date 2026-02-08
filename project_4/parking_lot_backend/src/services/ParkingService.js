// src/services/ParkingService.js
const ParkingLot = require("../models/ParkingLot");
const Ticket = require("../models/Ticket");
const PRICING = require("../constants/pricing");

class ParkingService {
  constructor() {
    this.parkingLot = new ParkingLot(3, {
      Bike: 5,
      Car: 5,
      Truck: 2,
    });
    this.activeTickets = new Map();
  }

  parkVehicle(vehicleType, vehicleNumber) {
    const found = this.parkingLot.findSlot(vehicleType);
    if (!found) throw new Error("Parking Full");

    const { floor, slot } = found;
    const vehicle = { vehicleType, vehicleNumber };

    slot.park(vehicle);
    const ticket = new Ticket(floor, slot, vehicle);
    this.activeTickets.set(ticket.ticketId, ticket);

    return ticket;
  }

  unparkVehicle(ticketId) {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) throw new Error("Invalid Ticket");

    const exitTime = new Date();
    const durationHours = Math.ceil(
      (exitTime - ticket.entryTime) / (1000 * 60 * 60)
    );

    const pricing = PRICING[ticket.vehicle.vehicleType];
    const amount =
      pricing.base +
      Math.max(0, durationHours - 1) * pricing.extra;

    const floor = this.parkingLot.floors.find(
      (f) => f.floorNumber === ticket.floor
    );

    const slot = floor.slots.find(
      (s) => s.slotNumber === ticket.slot
    );

    slot.unpark();
    this.activeTickets.delete(ticketId);

    return {
      vehicleNumber: ticket.vehicle.vehicleNumber,
      duration: `${durationHours} hours`,
      amount,
    };
  }
}

module.exports = new ParkingService();
