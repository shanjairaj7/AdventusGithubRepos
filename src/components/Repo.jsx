import React, { useCallback, useRef } from "react";

import { formatDistanceToNow } from "date-fns";

export const Repo = ({ repo, reposLength, index, loadMore }) => {
  const daysAgo = formatDistanceToNow(new Date(repo.createdAt));

  const observer = useRef();

  // Observe screen to run the loadMore function
  // when the last element is visible in the screen
  const observeScreen = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (reposLength !== 50) {
          return loadMore();
        }
      }
    });
    if (node) observer.current.observe(node);
  };

  const lastElementRef = useCallback(observeScreen);

  // Only attach the ref to the last element
  // So that the loadMore function gets called once the user reaches and views the last element
  if (reposLength === index + 1) {
    return (
      <div className="repo" ref={lastElementRef}>
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
  }

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
