import React, {useEffect} from 'react';
import {adminCoinsService} from "../../services/coins/admin/admin.coins.service";
import {ApiCoin, ApiCoinPaginated} from "../../services/coins/admin/admin.coins.interfaces";
import {publicCoinsService} from "../../services/coins/public/public.coins.service";
import {LocalCoin} from "../../types";

const AdminCoins = () => {
    const [data, setData] = React.useState<ApiCoinPaginated>();
    const [addedCoins, setAddedCoins] = React.useState<LocalCoin[]>([]);

    useEffect(() => {
        const fetchAddedCoins = async () => {
            setAddedCoins(await publicCoinsService.getLocalCoins())
        }
        const fetchData = async () => {
            setData(await adminCoinsService.getCoinsFromApi(data?.links?.next ?? "http://localhost:5000/api/coins/allFromApi"))
        }

        fetchAddedCoins();
        fetchData();
    }, [])

    const setPreviousCoins = async () => {
        const response: ApiCoinPaginated = await adminCoinsService.getCoinsFromApi(data?.links?.previous ?? "http://localhost:5000/api/coins/allFromApi");

        setData(response);
    }

    const setNextCoins = async () => {
        const response: ApiCoinPaginated = await adminCoinsService.getCoinsFromApi(data?.links?.next ?? "http://localhost:5000/api/coins/allFromApi");

        setData(response);
    }

    const handleAddToLocal = async (coinId: number) => {
        try {
            await adminCoinsService.addApiCoinToDb({
                coinApiId: coinId
            })
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteFromLocal = async (coinId: number) => {
        try {
            if (!coinId) return;
            await adminCoinsService.deleteLocalCoin(coinId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='bg-white bg-opacity-10 text-white rounded-lg shadow-lg mt-4 p-4'>
            <div className="flex justify-between">
                <div>
                    <h2 className='text-xl font-semibold'>Coins list</h2>
                    <p className='text-sm mt-2'>Added coins : {addedCoins?.length}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        className={`bg-gray-500 bg-opacity-20 text-white p-2 `}
                        onClick={setPreviousCoins}
                        disabled={!data?.links?.previous}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-gray-500 bg-opacity-20 text-white p-2"
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
                    <th>Nom</th>
                    <th>Symbole</th>
                    <th>Niveau</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data?.items?.map((coin: ApiCoin) => (
                    <tr>
                        <td>{coin.id}</td>
                        <td>{coin.name}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.rank}</td>
                        <td>
                            {
                                !coin.addedToLocal &&
                                <button
                                    className='text-blue-500 hover:underline'
                                    onClick={() => handleAddToLocal(coin.apiId)}
                                >
                                    Add
                                </button>
                            }
                            {
                                coin.addedToLocal &&
                                <button
                                    className='text-red-500 ml-2 hover:underline'
                                    onClick={() => handleDeleteFromLocal(coin.localCoinId)}
                                >
                                    Delete
                                </button>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCoins;