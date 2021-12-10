import { fetchCoins } from "api";
import ToggleButton from "components/ToggleButton";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px;
`;

const Header = styled.header`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 30px;
  margin: 30px;
`;

const Coin = styled.li`
  background-color: white;
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 48px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  isNew: boolean;
  isActive: boolean;
  type: string;
}

const Coins = function () {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin Pan 💸</title>
      </Helmet>
      <Header>
        <Title>Coin Pan 💸</Title>
        <ToggleButton />
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/coin/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};
export default Coins;
