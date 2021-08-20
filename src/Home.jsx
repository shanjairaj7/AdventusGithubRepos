import { useQuery } from "@apollo/client";
import React from "react";
import Loader from "react-loader-spinner";
import { POPULAR_REPOS } from "./graphql/queries";

import loader from "./images/1488.gif";
import { Repos } from "./views/Repos";

export const Home = () => {
  const { data: repos, loading, error } = useQuery(POPULAR_REPOS);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <Loader type="Oval" color="#00BFFF" height={50} width={50} />
          <h1>Loading Experience...</h1>
        </div>
      ) : (
        <div>
          <Repos repos={repos} />
        </div>
      )}
    </div>
  );
};
