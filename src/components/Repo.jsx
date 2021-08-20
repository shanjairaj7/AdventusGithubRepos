import React from "react";

import { formatDistanceToNow } from "date-fns";

export const Repo = ({ repo }) => {
  const daysAgo = formatDistanceToNow(new Date(repo.createdAt));

  return (
    <div className="repo">
      <div className="repo__owner__image">
        <img src={repo.owner.avatarUrl} alt={repo.owner.name} />
      </div>

      <div className="repo__details">
        <div className="repo__info">
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </div>
        <div className="repo__analytics">
          <h1>Stars: {repo.stargazers.totalCount}</h1>
          <h1>Issues: {repo.issues.totalCount}</h1>
          <h2>
            Submitted {daysAgo} {repo.owner.name}
          </h2>
        </div>
      </div>
    </div>
  );
};
