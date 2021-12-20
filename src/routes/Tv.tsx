import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  getAiringShows,
  getLatestShows,
  getPopularShows,
  getTopRatedShows,
  getTvDetail,
  IGetMoviesResult,
  IMovie,
} from "api";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { makeImagePath } from "utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  position: relative;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: black;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 80vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow-y: scroll;
  background-color: black;
  z-index: 2;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: white;
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: white;
`;

const SlideWrapper = styled.div`
  height: 300px;
  margin: 30px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    zIndex: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

const Tv = function () {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ tvId: string }>("/netflix/tv/:tvId");
  const { scrollY } = useViewportScroll();

  const { data: latest, isLoading: latestLoading } = useQuery<IGetMoviesResult>(
    ["tv", "latest"],
    getLatestShows,
  );

  const { data: airing, isLoading: airingLoading } = useQuery<IGetMoviesResult>(
    ["tv", "airing"],
    getAiringShows,
  );

  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["tv", "popular"], getPopularShows);

  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["tv", "topRated"], getTopRatedShows);

  const [index, setIndex] = useState<{
    [prop: string]: any;
    latest: number;
    topRated: number;
    airing: number;
    popular: number;
  }>({
    latest: 0,
    topRated: 0,
    airing: 0,
    popular: 0,
  });
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history.push(`/netflix/tv/${tvId}`);
  };
  const onOverlayClick = () => history.push("/netflix/tv");
  const data: any = [
    ...(latest?.results || []),
    ...(topRated?.results || []),
    ...(airing?.results || []),
    ...(popular?.results || []),
  ];

  const clickedMovie =
    bigMovieMatch?.params.tvId &&
    data?.find((tv: { id: number }) => tv.id === +bigMovieMatch.params.tvId);

  const { data: tvDetail, isLoading: detailLoading } = useQuery<IMovie>(
    ["tv", "detail"],
    () => getTvDetail(bigMovieMatch?.params.tvId || ""),
  );

  const increaseIndex = (type: string) => {
    if (leaving) return;
    const target = (type === "latest"
      ? latest
      : type === "topRated"
      ? topRated
      : type === "airing"
      ? airing
      : popular) || { results: [] };

    toggleLeaving();
    const totalMovies = target.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;

    setIndex((prev) => {
      const prevIndex = prev[type];

      return {
        ...prev,
        [type]: prevIndex === maxIndex ? 0 : prevIndex + 1,
      };
    });
  };

  const isLoading =
    latestLoading ||
    topRatedLoading ||
    airingLoading ||
    popularLoading ||
    detailLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(latest?.results[0].backdrop_path || "")}
          >
            <Title>{latest?.results[0].name}</Title>
            <Overview>{latest?.results[0].overview}</Overview>
          </Banner>
          {latest && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">Latest Shows 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("latest")}
                >
                  Next
                </Button>
              </TitleWrapper>
              <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index.latest}
                  >
                    {latest?.results
                      .slice(1)
                      .slice(
                        offset * index.latest,
                        offset * index.latest + offset,
                      )
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}latest`}
                          onClick={() => onBoxClicked(movie.id)}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{movie.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </SlideWrapper>
          )}
          {topRated && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">Top Rated Shows 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("topRated")}
                >
                  Next
                </Button>
              </TitleWrapper>
              <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index.topRated}
                  >
                    {topRated?.results
                      .slice(1)
                      .slice(
                        offset * index.topRated,
                        offset * index.topRated + offset,
                      )
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}topRated`}
                          onClick={() => onBoxClicked(movie.id)}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{movie.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </SlideWrapper>
          )}
          {airing && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">TV Airing Today 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("airing")}
                >
                  Next
                </Button>
              </TitleWrapper>
              <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index.airing}
                  >
                    {airing?.results
                      .slice(1)
                      .slice(
                        offset * index.airing,
                        offset * index.airing + offset,
                      )
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}airing`}
                          onClick={() => onBoxClicked(movie.id)}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{movie.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </SlideWrapper>
          )}
          {popular && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">Popular Shows 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("popular")}
                >
                  Next
                </Button>
              </TitleWrapper>
              <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index.popular}
                  >
                    {popular?.results
                      .slice(1)
                      .slice(
                        offset * index.popular,
                        offset * index.popular + offset,
                      )
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}popular`}
                          onClick={() => onBoxClicked(movie.id)}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{movie.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </SlideWrapper>
          )}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.tvId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500",
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.name}</BigTitle>
                      <BigOverview>
                        Episodes 🍿: {tvDetail?.number_of_episodes}
                      </BigOverview>
                      <BigOverview>
                        Popularity 💯: {tvDetail?.popularity}
                      </BigOverview>
                      <BigOverview>
                        Website 🌏:{" "}
                        <a
                          href={tvDetail?.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {tvDetail?.homepage}
                        </a>
                      </BigOverview>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};
export default Tv;
