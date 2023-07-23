import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ReadMoreCard from "./cards/ReadMoreCard";
const ReadMore = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("/api/stories/all").then(({ data: { data } }) => {
      setStories(data.slice(0, 6));
    });
  }, []);
  return (
    <>
      {stories ? (
        <div className="sticky top-0 border-t border-cyan hidden lg:flex flex-col justify-start items-center w-[370px] h-[100%]">
          <div className="border-b border-cyan relative px-1 flex w-[100%] h-[180px] flex-col items-center justify-center">
            <button
              type="button"
              className="w-[96%]  transition-all duration-75 ease-in inline-flex justify-center items-center font-semibold rounded-lg px-5 py-3 text-md bg-black text-white hover:text-white"
              id="tk-dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Write
            </button>
            <h1 className="absolute left-1.3 bottom-1 font-light self-start ml-2">
              Read More From People!
            </h1>
          </div>
          {stories.map((story, index) => {
            return <ReadMoreCard story={story} key={index} />;
          })}
        </div>
      ) : null}
    </>
  );
};

export default ReadMore;
