import styled from "styled-components";
import { Input } from "./styledElements";

const SearchDiv = styled.div`
  width: 75vw;
  height: 2rem;
  top: 150px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

function SearchBar({
  search,
  updateSearch,
}: {
  search: string;
  updateSearch: (term: string) => void;
}) {
  return (
    <SearchDiv key={"searching"}>
      <Input
        style={{
          width: "100%",
          height: "2.5rem",
          border: "solid 3px #212a31",
          borderRadius: "0.4rem",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
        type="text"
        name="search"
        id="searchText"
        placeholder="Search"
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
        autoFocus={true}
      />
      <i
        style={{
          float: "right",
          position: "relative",
          top: "-38px",
          right: "15px",
        }}
        className="fas fa-search"
      ></i>
    </SearchDiv>
  );
}

export default SearchBar;
