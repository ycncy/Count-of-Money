import { addToLocal } from '../../api/admin';
import { CoinData } from '../../types';

interface Props {
  coin: CoinData;
  userRole: string | undefined;
}

export function CoinComponent({ coin, userRole }: Props) {
  const addToApi = async () => {
    await addToLocal(coin.apiId);
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
}
