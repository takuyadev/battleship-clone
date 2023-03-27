import { Ships } from "@models/types.common";

export interface ShipListProps {
  ships: Ships
}

const ShipList = ({ ships }: ShipListProps) => {
  return (
    <div className='flex flex-col'>
      {ships.map((ship) => {
        return (
          <p className={`${ship.hitCount === ship.height && 'line-through'}`}>
            {ship.name}
          </p>
        );
      })}
    </div>
  );
};

export default ShipList;
