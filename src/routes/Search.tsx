import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  getMovieDetail,
  getTvDetail,
  IGetMoviesResult,
  IMovie,
  searchMovies,
  searchTvs,
} from "api";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router";
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
  top: -80px;
  position: relative;
`;

const SearchTitle = styled.h3`
  color: white;
  padding: 20px;
  font-size: 46px;
  position: relative;
  text-align: center;
  margin: 200px;
  // top: -80px;
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

const Search = function () {
  const location = useLocation();
  const keyword =
    new URLSearchParams(location.search).get("keyword") ||
    localStorage.getItem("search");

  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ id: string }>("/netflix/search/:id");
  const { scrollY } = useViewportScroll();

  const { data: movies, isLoading: moviesLoading } = useQuery<IGetMoviesResult>(
    ["search", "movies"],
    () => searchMovies(keyword || ""),
  );

  const { data: tvs, isLoading: tvsLoading } = useQuery<IGetMoviesResult>(
    ["search", "tvs"],
    () => searchTvs(keyword || ""),
  );
  const [index, setIndex] = useState<{
    [prop: string]: any;
    movies: number;
    tvs: number;
  }>({
    movies: 0,
    tvs: 0,
  });
  const [leaving, setLeaving] = useState(false);
  const [type, setType] = useState("movies");
  const toggleLeaving = () => setLeaving((prev) => !prev);
  console.log(keyword);
  const onOverlayClick = () =>
    history.push(`/netflix/search?keyword=${keyword}`);

  const onBoxClicked = (id: number, type: string) => {
    setType(type);
    history.push(`/netflix/search/${id}`);
  };
  const data: any = [...(movies?.results || []), ...(tvs?.results || [])];

  const clickedMovie =
    bigMovieMatch?.params.id &&
    data?.find((tv: { id: number }) => tv.id === +bigMovieMatch.params.id);

  const { data: detail, isLoading: detailLoading } = useQuery<IMovie>(
    ["search", "detail"],
    () =>
      type === "movies"
        ? getMovieDetail(bigMovieMatch?.params.id || "")
        : getTvDetail(bigMovieMatch?.params.id || ""),
  );

  const increaseIndex = (type: string) => {
    if (leaving) return;
    const target = (type === "movies" ? movies : tvs) || { results: [] };

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

  const isLoading = moviesLoading || tvsLoading || detailLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SearchTitle>Keyword : {keyword}</SearchTitle>
          {movies && movies?.results && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">Movies 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("movies")}
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
                    key={index.movies}
                  >
                    {movies?.results
                      .slice(1)
                      .slice(
                        offset * index.movies,
                        offset * index.movies + offset,
                      )
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}movies`}
                          onClick={() => onBoxClicked(movie.id, "movies")}
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
          {tvs && tvs.results && (
            <SlideWrapper>
              <TitleWrapper>
                <Text fontSize="5xl">TV Shows 🎬</Text>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => increaseIndex("tvs")}
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
                    key={index.tvs}
                  >
                    {tvs?.results
                      .slice(1)
                      .slice(offset * index.tvs, offset * index.tvs + offset)
                      .map((movie) => (
                        <Box
                          layoutId={`${movie.id}tvs`}
                          onClick={() => onBoxClicked(movie.id, "tvs")}
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
                  layoutId={bigMovieMatch.params.id}
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
                      <BigTitle>
                        {clickedMovie?.name || clickedMovie?.title}
                      </BigTitle>
                      <BigOverview>
                        Episodes 🍿: {clickedMovie?.number_of_episodes}
                      </BigOverview>
                      <BigOverview>
                        Popularity 💯: {clickedMovie?.popularity}
                      </BigOverview>
                      <BigOverview>
                        Website 🌏:{" "}
                        <a
                          href={clickedMovie?.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {clickedMovie?.homepage}
                        </a>
                      </BigOverview>
                      <BigOverview>{clickedMovie?.overview}</BigOverview>
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
export default Search;
