import os
from datetime import datetime, timedelta
import yfinance as yf
import pandas as pd

from predictions.pipeline.enum.time_interval import TimeInterval


class DataCollector:
    def __init__(self, coin_id: int, coin_symbol: str, currency: str = "USD",
                 interval: TimeInterval = TimeInterval.DAY):
        self.ticker = None
        self.coin_id = coin_id
        self.coin_symbol = coin_symbol
        self.currency = currency
        self.interval = interval

    def _get_ticker(self):
        ticker_symbol = f"{self.coin_symbol}-{self.currency}"
        self.ticker = yf.Ticker(ticker_symbol)

    def _collect_data_other_intervals(self, interval) -> dict:
        period_mapping = {
            "1m": "7d",
            "1h": "730d",
            "1d": "7y",
            "5d": "7y",
            "1w": "7y",
            "1mo": "7y",
        }

        period = period_mapping.get(interval.value, "7d")
        data = self.ticker.history(period=period, interval=interval.value)

        return data.to_dict()

    def _process_and_save_data(self, raw_data_from_api: dict):
        processed_data = pd.DataFrame(raw_data_from_api).drop(["Dividends", "Stock Splits"], axis=1)

        processed_data = processed_data.reset_index().rename(columns={'index': 'datetime'})

        directory_path = f"../data/processed_data/{self.coin_symbol}/{self.interval.name}"

        if not os.path.exists(directory_path):
            os.makedirs(directory_path)

        timestamp_str = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

        csv_file_path = os.path.join(directory_path, f"{self.coin_symbol}_data_{timestamp_str}.csv")

        processed_data.to_csv(
            path_or_buf=csv_file_path,
            date_format="%Y-%m-%d %H:%M:%S",
            index=False
        )

    def process_pipeline(self):
        try:
            self._get_ticker()

            raw_data_from_api = self._collect_data_other_intervals(self.interval)

            self._process_and_save_data(raw_data_from_api)

        except Exception as e:
            print(f"Error collecting data: {e}")
            return None
