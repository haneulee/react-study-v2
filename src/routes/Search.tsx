import { useLocation } from "react-router";

const Search = function () {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
};
export default Search;
