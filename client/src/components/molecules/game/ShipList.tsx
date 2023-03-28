import { Ships } from '@models/types.common';

export interface ShipListProps {
  ships: Ships;
  direction: 'right' | 'left';
}

const ShipList = ({ ships, direction }: ShipListProps) => {
  return (
    <div className='flex border-slate-100 border-2 rounded-lg flex-col gap-4 font-display font-bold text-slate-700 bg-slate-50 p-4'>
      {ships.map((ship) => {
        return (
          <div
            className={`${
              direction === 'right' ? 'flex-row text-right' : 'flex-row-reverse '
            } flex justify-between gap-8 `}
          >
            <p className={`px-4 py-2 text-slate-600 bg-slate-100 rounded-lg flex-1`}>
              {ship.name}
            </p>
            <div
              className={`p-2 rounded-full ${
                ship.hitCount === ship.height ? 'bg-rose-400' : 'bg-indigo-500'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ShipList;
