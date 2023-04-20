"use client";

import { useEffect, useState } from "react";
import { Button } from "../../lib/Button";

const Facts = () => {
  // Initializing the state variables
  const [fact, setFact] = useState("");
  const [query, setQuery] = useState("");
  const [isQuery, setIsQuery] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qloading, setQLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [curr, setCurr] = useState(0);
  const [focus, setFocus] = useState(true);

  // Fetching Chuck Norris categories from the API on initial load
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetch("https://api.chucknorris.io/jokes/categories");
      setCategories(await result.json());
    };
    fetchCategories();
  }, []);

  // Function for fetching a random fact
  const fetchFact = async () => {
    setQueryResults([]);
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    return res.json();
  };

  // Fetching a random fact from the selected category every time category changes
  useEffect(() => {
    const fetchCategory = async () => {
      // reset query results if used before
      setQueryResults([]);
      //start loading animation
      setLoading(true);
      fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((res) => res.json())
        // display the fact found
        .then((res) => setFact(res.value))
        // finish loading animation
        .then(() => setLoading(false))
        // handle errors
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    };
    if (category !== "") fetchCategory();
  }, [category]);

  // Function for handling input change in the search bar
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Function for fetching facts based on search query
  const fetchQuery = async () => {
    // set page to 0
    setCurr(0);
    // start laoding animation
    setQLoading(true);
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((res) => res.json())
      .then((res) => {
        setQueryResults(res.result.map((r) => r.value));
        setFact(res.result[1].value);
      })
      // finish loading animation
      .then(() => setQLoading(false))
      // handle errors
      .catch((e) => {
        console.log(e);
        setQLoading(false);
        setFact("Nothing was found. Chuck allows you to try again");
      });
  };

  // Function for displaying the next fact from the search results
  const handleNext = () => {
    if (queryResults.length - 1 > curr) {
      setCurr(curr + 1);
      setFact(queryResults[curr]);
    }
  };

  // Function for displaying the previous fact from the search results
  const handlePrev = () => {
    if (curr > 0) {
      setCurr(curr - 1);
      setFact(queryResults[curr]);
    }
  };

  // Function for handling enter key down event on the search bar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchQuery();
  };

  return (
    <>
      <h1 className="font-medium m-0 mb-16 text-4xl opacity-50">
        The temple of Chuck Norris
      </h1>
      <div className="h-60">
        {queryResults.length > 0 && (
          <div className="flex justify-center gap-2 mb-2">
            <Button disabled={curr === 0} onClick={handlePrev}>
              {<span className="font-bold">{"< Prev"}</span>}
            </Button>
            <span className="flex p-3 text-lg text-orange-400 font-semibold">
              {" "}
              {curr + 1} .. {queryResults.length}{" "}
            </span>
            <Button
              disabled={curr === queryResults.length - 1}
              onClick={handleNext}
            >
              {<span className="font-bold">{"Next >"}</span>}
            </Button>
          </div>
        )}
        <blockquote className="p-4 my-4 border-l-8 border-neutral-50 rounded-lg bg-neutral-900">
          <p className="text-xl italic font-medium  leading-relaxed text-neutral-50">
            {fact || 'press "i feel lucky" to learn more about Chuck Norris'}
          </p>
        </blockquote>
      </div>
      <div className="flex place-items-center flex-col gap-5">
        <Button
          onClick={async () => {
            const newFact = await fetchFact();
            setFact(newFact.value);
          }}
        >
          i feel lucky
        </Button>
        <Button
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "hide " : "show "}
          categories
        </Button>
        {show && (
          <ul className="grid grid-cols-4">
            {categories.map((c) => (
              <li key={c} className="m-1">
                <Button
                  onClick={() => {
                    setCategory(c);
                  }}
                  focus={true}
                >
                  {loading && category === c ? (
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    c
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-1">
          <Button onClick={() => setIsQuery(!isQuery)}>
            {isQuery ? "hide" : "query"}
          </Button>
          {isQuery && (
            <div
              className={`bg-neutral-800 ${
                focus ? "outline outline-1 outline-neutral-300" : ""
              } flex rounded-lg`}
            >
              <input
                placeholder="war"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="h-full bg-neutral-800 outline-none rounded text-neutral-50 font-semibold p-2"
                autoFocus
                type="text"
              />
              <button
                onClick={fetchQuery}
                className="bg-orange-500 font-bold w-12 m-1 rounded-lg"
              >
                {qloading ? (
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "GO"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Facts;
