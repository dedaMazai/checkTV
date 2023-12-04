import { useEffect, useState } from "react";
export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  console.log(
    "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
  );
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export default function Index() { 
  const [data, setData] = useState('')
  const [timer, setTimer] = useState(0);

  const fetching = async () => {
    const response = await fetch('https://fakerapi.it/api/v1/books?_quantity=2', {
      method: 'GET',
    });
    const res = await response.json();
    setData(JSON.stringify(res));
  }

  useEffect(() => {
    fetching()
  }, []);

  const add = function () {
    setTimer((prev: number) => {
      return ++prev;
    });
  };

  useEffect(function () {
    const timerId = setInterval(add, 1000);

    return function () {
      clearInterval(timerId);
    };
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{timer}</h1>
      <p>{data}</p>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer noopener"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer noopener"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer noopener"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </main>
  );
}