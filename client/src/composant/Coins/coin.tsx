import { adminCoinsService } from '../../services/coins/admin/admin.coins.service';
import { ApiCoin } from '../../services/coins/admin/admin.coins.interfaces';

interface Props {
  coin: ApiCoin;
  userRole: string | undefined;
}

export function CoinComponent({ coin, userRole }: Props) {
  const addToApi = async () => {
    await adminCoinsService.addApiCoinToDb({
      coinApiId: coin.id,
    });
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
