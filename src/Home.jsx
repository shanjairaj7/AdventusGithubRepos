import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { POPULAR_REPOS } from "./graphql/queries";

import { Repos } from "./views/Repos";

export const Home = () => {
  const [repos, setRepos] = useState([]);
  const [first, setFirst] = useState(10);

  const [loading, setLoading] = useState(false);

  const {
    data,
    loading: dataLoading,
    error,
    fetchMore,
  } = useQuery(POPULAR_REPOS, {
    variables: {
      first: 10,
    },
  });

  const loadMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        first,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        setLoading(false);

        if (first <= 50) setFirst(first + 10);

        return setRepos([
          ...previousResult.search.edges,
          ...fetchMoreResult.search.edges.slice(
            previousResult.search.edges.length,
            fetchMoreResult.search.edges.length
          ),
        ]);
      },
    });
  };

  useEffect(() => {
    if (data) {
      setRepos([...repos, ...data.search.edges]);
    }
  }, [dataLoading, data]);

  return (
    <div>
      {repos.length > 0 && (
        <div>
          <h1 className="repos__title">50 Popular Javascript Repositories</h1>
          <Repos repos={repos} loadMore={loadMore} />
        </div>
      )}

      {dataLoading || !data || loading ? (
        <div className="loading">
          <Loader type="Oval" color="#00BFFF" height={50} width={50} />
          <h1>
            Loading {loading && "more"} Popular Javascript Repositories...
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
