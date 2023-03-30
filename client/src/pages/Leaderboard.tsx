import { useState, useEffect } from 'react';
import { LeaderboardGet } from '@models/interfaces.common';
import PageTransition from '@components/atoms/ui/PageTransition';
import axios from 'axios';
import { AxiosResponse } from 'axios';

const Leaderboard = () => {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const async = async () => {
      const res: AxiosResponse<LeaderboardGet> = await axios.get(
        'http://localhost:5000/leaderboard'
      );
      setData(res.data.data);
    };
    async();
  }, []);

  return (
    <PageTransition className='w-full flex justify-center'>
      <table className='text-center font-body overflow-hidden rounded-lg max-w-2xl w-full'>
        <thead className='bg-slate-200 text-slate-700'>
          <tr>
            <th className='font-body p-4'>Username</th>
            <th className='font-body p-4'>Turn Count</th>
          </tr>
        </thead>
        <tbody className='text-slate-500'>
          {data &&
            data.map((item, i) => {
              return (
                <tr className='even:bg-slate-100 odd:bg-slate-50' key={i}>
                  <td className='font-body p-4'>{item.username}</td>
                  <td className='font-body p-4 font-bold'>{item.turnCount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </PageTransition>
  );
};

export default Leaderboard;
