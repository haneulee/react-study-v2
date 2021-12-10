import { Text } from "@chakra-ui/layout";
import { fetchCoinTickers } from "api";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";

const Item = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
`;

const Price = function () {
  const { coinId } = useParams<RouteParams>();
  const { isLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
  );

  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <Text fontSize="4xl" style={{ padding: "30px" }}>
            Price
          </Text>
          <Item>
            <span>price</span>
            <span>$ {tickersData?.quotes.USD.price.toFixed(2)}</span>
          </Item>
          <Text fontSize="4xl" style={{ padding: "30px" }}>
            Price Change
          </Text>
          <Item>
            <span>15 min</span>
            <span>
              {tickersData?.quotes.USD.percent_change_15m.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>30 min</span>
            <span>
              {tickersData?.quotes.USD.percent_change_30m.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>1 hour</span>
            <span>
              {tickersData?.quotes.USD.percent_change_1h.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>6 hour</span>
            <span>
              {tickersData?.quotes.USD.percent_change_6h.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>12 hour</span>
            <span>
              {tickersData?.quotes.USD.percent_change_12h.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>24 hour</span>
            <span>
              {tickersData?.quotes.USD.percent_change_24h.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>7 day</span>
            <span>
              {tickersData?.quotes.USD.percent_change_7d.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>30 day</span>
            <span>
              {tickersData?.quotes.USD.percent_change_30d.toFixed(2)} %
            </span>
          </Item>
          <Item>
            <span>1 year</span>
            <span>
              {tickersData?.quotes.USD.percent_change_1y.toFixed(2)} %
            </span>
          </Item>
          <Text fontSize="4xl" style={{ padding: "30px" }}>
            Volumn
          </Text>
          <Item>
            <span>24 hour</span>
            <span>{tickersData?.quotes.USD.volume_24h.toFixed(0)}</span>
          </Item>
          <Item>
            <span>24 hour change</span>
            <span>
              {tickersData?.quotes.USD.volume_24h_change_24h.toFixed(2)} %
            </span>
          </Item>
        </>
      )}
    </div>
  );
};

export default Price;
