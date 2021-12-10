import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = function ({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    },
  );

  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                const open = price.open.toFixed(2);
                const high = price.high.toFixed(2);
                const low = price.low.toFixed(2);
                const close = price.close.toFixed(2);
                return {
                  x: new Date(price.time_open),
                  y: [open, high, low, close],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
            },
            grid: { show: false },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
            },
            colors: ["#0fbcf9"],
            dataLabels: {
              formatter: (value: number) => `$${value.toFixed(2)}`,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
