import React from "react";
import ReactDOM from "react-dom/client";
import SearchResults from "./SearchResults";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <SearchResults />
);
