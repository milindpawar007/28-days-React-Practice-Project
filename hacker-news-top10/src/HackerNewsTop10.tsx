import React, { useEffect, useState } from 'react';

interface Story {
  score: number;
  id: number;
  title: string;
  url: string;
  by: string;
}

export default function HackerNewsTop10() {
  const [topstories, setTopstories] = useState<number[]>([]);
  const [articleData, setArticleData] = useState<Story[]>([]);
  const [loader, setLoader] = useState(false);

  // Fetch top story IDs
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storiesIDs = await res.json();
      setTopstories(storiesIDs.slice(0, 10));
    };
    getData();
  }, []);

  // Fetch individual story data
  useEffect(() => {
    const fetchStories = async () => {
      setLoader(false);
      const storyPromises = topstories.map(async (id) => {
        const response = await fetch(`http://localhost:4000/api/item/${id}`);
        const result = await response.json();
        return {
          score: result.score,
          id: result.id,
          title: result.title,
          url: result.url,
          by: result.by,
        };
      });

      const stories = await Promise.all(storyPromises);
      setArticleData(stories);
      setLoader(true);
    };

    if (topstories.length > 0) {
      fetchStories();
    }
  }, [topstories]);

  return (
    <div>
      {loader ? (
        <div className="container">
          <h1>Top 10 Hacker News Stories</h1>
          <ul>
            {articleData.map((article) => (
              <li key={article.id}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
                <span> (Score: {article.score})</span>
                <span> by {article.by}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="simple-spinner">
          <span></span>
        </div>
      )}
    </div>
  );
}
