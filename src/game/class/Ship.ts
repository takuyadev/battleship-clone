interface IShip_Props {
  height: number
}

class Ship {
  height: number

  constructor({height}:IShip_Props){
    this.height = height
  }
}

export default Ship