class slot {
    constructor(slotNumber,type){
        this.slotNumber = slotNumber;
        this.type = type;
        this.isOccupied = false;
        this.vehicle = null;
    }

    park(vehcile){
        this.isOccupied = true;
        this.vehicle = this.vehicle;
    }

    unpark(){
        const vehcile = this.vehicle;
        this.isOccupied = false;
        this.vehicle = null;
        return vehcile;
    }
}

Module.exports = slot