import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  getLatestMovies,
  getMovieDetail,
  getTopRatedMovies,
  getUpcomingMovies,
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
  cursor: pointer;
  position: relative;
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

const Home = function () {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    "/netflix/movie/:movieId",
  );
  const { scrollY } = useViewportScroll();

  const { data: latest, isLoading: latestLoading } = useQuery<IGetMoviesResult>(
    ["movies", "latest"],
    getLatestMovies,
  );

  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);

  const { data: upcoming, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcoming"], getUpcomingMovies);

  const [index, setIndex] = useState<{
    [prop: string]: any;
    latest: number;
    topRated: number;
    upcoming: number;
  }>({
    latest: 0,
    topRated: 0,
    upcoming: 0,
  });
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/netflix/movie/${movieId}`);
  };
  const onOverlayClick = () => history.push("/netflix");
  const data: any = [
    ...(latest?.results || []),
    ...(topRated?.results || []),
    ...(upcoming?.results || []),
  ];

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.find(
      (movie: { id: number }) => movie.id === +bigMovieMatch.params.movieId,
    );

  const { data: movieDetail, isLoading: detailLoading } = useQuery<IMovie>(
    ["movies", "detail"],
    () => getMovieDetail(bigMovieMatch?.params.movieId || ""),
  );

  const increaseIndex = (type: string) => {
    if (leaving) return;
    const target = (type === "latest"
      ? latest
      : type === "topRated"
      ? topRated
      : upcoming) || { results: [] };

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
    latestLoading || topRatedLoading || upcomingLoading || detailLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(latest?.results[0].backdrop_path || "")}
          >
            <Title>{latest?.results[0].title}</Title>
            <Overview>{latest?.results[0].overview}</Overview>
          </Banner>
          {latest && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">Latest Movies 🎬</Text>
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
                            <h4>{movie.title}</h4>
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
                <Text fontSize="5xl">Top Rated Movies 🎬</Text>
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
                            <h4>{movie.title}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </SlideWrapper>
          )}
          {upcoming && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">Upcoming Movies 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("upcoming")}
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
                    key={index.upcoming}
                  >
                    {upcoming?.results
                      .slice(1)
                      .slice(
                        offset * index.upcoming,
                        offset * index.upcoming + offset,
                      )
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}upcoming`}
                          onClick={() => onBoxClicked(movie.id)}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{movie.title}</h4>
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
                  layoutId={bigMovieMatch.params.movieId}
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
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>
                        Runtime 🍿: {movieDetail?.runtime}
                      </BigOverview>
                      <BigOverview>
                        Popularity 💯: {movieDetail?.popularity}
                      </BigOverview>
                      <BigOverview>
                        Website 🌏:{" "}
                        <a
                          href={movieDetail?.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {movieDetail?.homepage}
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
export default Home;
