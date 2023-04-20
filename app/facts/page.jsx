"use client";

import { useEffect, useState } from "react";
import { Button } from "../../lib/Button";

const fetchFact = async () => {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  return res.json();
};

const Facts = () => {
  const [fact, setFact] = useState("");
  const [query, setQuery] = useState("");
  const [isQuery, setIsQuery] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qloading, setQLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetch("https://api.chucknorris.io/jokes/categories");
      setCategories(await result.json());
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((res) => res.json())
        .then((res) => setFact(res.value))
        .then(() => setLoading(false));
    };
    if (category !== "") fetchCategory();
  }, [category]);


  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  const fetchQuery = async () => {
    setQLoading(true);
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((res) => res.json())
      .then((res) => setFact(res.result[0].value))
      .then(() => setQLoading(false));
  };

  return (
    <>
      <h1 className="font-medium m-0 max-w-[30ch] mb-16 text-4xl opacity-50">
        Chucks temple
      </h1>
      <div className="h-40">
        <blockquote className="p-4 my-4 border-l-8 border-neutral-50 rounded-lg bg-neutral-900">
          <p className="text-xl italic font-medium leading-relaxed text-neutral-50">
            {fact || 'click "i feel lucky" to learn more about Chuck Norris'}
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
            <div className="bg-neutral-800 flex rounded-lg">
              <input
                onChange={handleInputChange}
                className="h-full bg-neutral-800 outline-none rounded text-neutral-50 font-semibold p-2"
                autoFocus
                type="text"
              />
              <button
                onClick={fetchQuery}
                className="bg-green-500 w-12 m-1 rounded-lg"
              >
                GO
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Facts;
