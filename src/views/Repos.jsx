import React from "react";
import { Repo } from "../components/Repo";

export const Repos = ({ repos }) => {
  return (
    <div className="repos">
      {repos.search.edges.map((repo) => (
        <Repo repo={repo.node} />
      ))}
    </div>
  );
};
