import { addToLocalApi } from '../../api/admin';
import { Coin } from '../../types';

interface Props {
  coin: Coin;
  userRole: string | undefined;
}

export const CoinComponent = ({ coin, userRole }: Props) => {
  const addToApi = async () => {
    await addToLocalApi(coin.api_id);
  };

  return (
    <div>
      <h1>Coins</h1>
      <div>
        <h2>{coin.name}</h2>
        <h3>{coin.symbol}</h3>
        <h4>{coin.rank}</h4>
        <h4>{coin.id}</h4>
        {userRole === 'ADMIN' && (
          <button onClick={addToApi}>add to local API</button>
        )}
      </div>
    </div>
  );
};
