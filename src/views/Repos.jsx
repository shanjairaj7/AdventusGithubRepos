import React from "react";
import { Repo } from "../components/Repo";

export const Repos = ({ repos, loadMore }) => {
  return (
    <div className="repos">
      {repos.map((repo, index) => {
        return (
          <Repo
            index={index}
            repo={repo.node}
            reposLength={repos.length}
            loadMore={loadMore}
          />
        );
      })}
    </div>
  );
};
