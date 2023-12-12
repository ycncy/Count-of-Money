import React, {useEffect} from 'react';
import {Coin, CoinData, RawCoins} from "../../types";
import {getPaginationCoins} from "../../api/public";
import {addToLocal, deleteFromLocal} from "../../api/admin";
import {getLocalCoins} from "../../api/user";

const AdminCoins = () => {
    const [data, setData] = React.useState<Coin>();
    const [addedCoins, setAddedCoins] = React.useState<RawCoins[]>([]);

    useEffect(() => {
        const fetchAddedCoins = async () => {
            setAddedCoins(await getLocalCoins())
        }
        const fetchData = async () => {
            setData(await getPaginationCoins(data?.links?.previous ?? "http://localhost:5000/api/coins/allFromApi"))
        }

        fetchAddedCoins();
        fetchData();
    }, [])

    const setPreviousCoins = async () => {
        const response = await getPaginationCoins(data?.links?.previous ?? "http://localhost:5000/api/coins/allFromApi");

        setData(response);
    }

    const setNextCoins = async () => {
        const response = await getPaginationCoins(data?.links?.next ?? "http://localhost:5000/api/coins/allFromApi");

        setData(response);
    }

    const handleAddToLocal = async (coinId: number) => {
        try {
            await addToLocal(coinId);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteFromLocal = async (coinId: number) => {
        try {
            if (!coinId) return;
            await deleteFromLocal(coinId);
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
                {data?.items?.map((coin: CoinData) => (
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