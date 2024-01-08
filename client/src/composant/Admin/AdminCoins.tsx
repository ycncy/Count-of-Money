import React, { useEffect } from 'react';
import { adminCoinsService } from '../../services/coins/admin/admin.coins.service';
import {
  ApiCoin,
  ApiCoinPaginated,
} from '../../services/coins/admin/admin.coins.interfaces';
import { publicCoinsService } from '../../services/coins/public/public.coins.service';
import { LocalCoin } from '../../services/coins/public/public.coins.interfaces';
import { fetchAllCoinsFromApi } from '../../api/admin';
import {logout} from "../../services/authentication/authentication.service";

export function AdminCoins() {
  const [data, setData] = React.useState<ApiCoinPaginated>();
  const [addedCoins, setAddedCoins] = React.useState<LocalCoin[]>([]);

  const fetchAddedCoins = async () => {
    setAddedCoins(await publicCoinsService.getLocalCoins());
  };

  const fetchData = async () => {
    setData(
      await adminCoinsService.getCoinsFromApi(
        data?.links?.next ?? 'http://localhost:5000/api/coins/allFromApi'
      )
    );
  };

  useEffect(() => {
    fetchAddedCoins();
    fetchData();
    console.log(data)
  }, []);

  const setPreviousCoins = async () => {
    const response: ApiCoinPaginated = await adminCoinsService.getCoinsFromApi(
      data?.links?.previous ?? 'http://localhost:5000/api/coins/allFromApi'
    );

    setData(response);
  };

  const setNextCoins = async () => {
    const response: ApiCoinPaginated = await adminCoinsService.getCoinsFromApi(
      data?.links?.next ?? 'http://localhost:5000/api/coins/allFromApi'
    );

    setData(response);
  };

  const handleAddToLocal = async (coinId: number) => {
    try {
      await adminCoinsService.addApiCoinToDb({
        coinApiId: coinId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFromLocal = async (coinId: number) => {
    try {
      if (!coinId) return;
      await adminCoinsService.deleteLocalCoin(coinId);
      setData(
        await adminCoinsService.getCoinsFromApi(
          data?.links?.next ?? 'http://localhost:5000/api/coins/allFromApi'
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const initAllCoins = async () => {
    await fetchAllCoinsFromApi();
    setData(
      await adminCoinsService.getCoinsFromApi(
        'http://localhost:5000/api/coins/allFromApi'
      )
    );
  };

  return (
    <div className='bg-[#1F2937 ] bg-opacity-10 text-white rounded-lg shadow-lg mt-4 p-4'>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>Coins list</h2>
          <p className='text-sm mt-2'>Added coins : {addedCoins?.length}</p>
          <button onClick={initAllCoins}>Fetch all coins</button>
        </div>
        <div className='flex gap-2 items-center'>
          <button
            className={`bg-gray-500 bg-opacity-20 text-white p-2 `}
            onClick={setPreviousCoins}
            disabled={!data?.links?.previous}
          >
            Previous
          </button>
          <button
            className='bg-gray-500 bg-opacity-20 text-white p-2'
            onClick={setNextCoins}
            disabled={!data?.links?.next}
          >
            Next
          </button>
        </div>
      </div>

      <table className='w-full text-center mt-4'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Rank</th>
            <th>ApiId</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((coin: ApiCoin) => (
            <tr key={coin.id}>
              <td>{coin.id}</td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{coin.rank}</td>
              <td>{coin.apiId}</td>
              <td>
                {!coin.addedToLocal && (
                  <button
                    className='text-blue-500 hover:underline'
                    onClick={() => handleAddToLocal(coin.apiId)}
                  >
                    Add
                  </button>
                )}
                {coin.addedToLocal && (
                  <button
                    className='text-red-500 ml-2 hover:underline'
                    onClick={() => handleDeleteFromLocal(coin.localCoinId)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
