import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import close from "../assets/images/close.svg";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios";
import Button from "./common/Button";

const Publish = ({ setPublishMode, content }) => {
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [thumbnail, setThumbnail] = useState(null);

  const categories = [
    "Personal",
    "Finance",
    "Health & Fitness",
    "Politics",
    "Entertainment",
    "Relationships",
    "Science and Technology",
    "Self improvment",
    "Environment",
    "Others",
  ];

  const createStory = () => {
    return new Promise(async (resolve, reject) => {
      const newStory = {
        title,
        subtitle,
        content,
        thumbnail,
        author: userProfile._id,
        category,
        publishedAt: new Date(),
        reactions: {
          heart: 0,
          smile: 0,
          flash: 0,
          shock: 0,
          sad: 0,
        },
        comments: [],
      };

      try {
        const response = await axios.post("/api/create", newStory);
        const storyId = response.data.data._id;
        navigate(`/stories/${storyId}`);
        resolve();
      } catch (err) {
        reject();
      }
    });
  };

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random/?client_id=EcA3PWnVrPvszvIvY6OPSmQrzJWNXHo_RFaAaZI6_Ds&query=nature"
        );

        setThumbnail(response.data.urls.full);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThumbnail();
  }, []);

  return (
    <>
      <img
        src={close}
        className="h-[20px] w-[20px] lg:h-[25px] lg:w-[25px] absolute top-6 right-6 cursor-pointer"
        alt="close"
        onClick={() => setPublishMode(false)}
      />

      <div className="px-5 py-5 lg:p-28 flex flex-col md:flex-row items-center justify-center gap-10 min-h-[80vh] w-[100%]">
        <div className="flex flex-col justify-start gap-5 w-[100%] ">
          <p className="text-md font-semibold">Story Preview</p>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="p-5 rounded-md bg-[#F1F5F9] min-h-[250px] h-fit w-[100%]"
          ></div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            class="p-1 bg-transparent text-lg border-b-2 border-gray-400 outline-none"
            placeholder="Write a preview title"
          />
          <input
            onChange={(e) => setSubtitle(e.target.value)}
            type="text"
            class="p-1 bg-transparent text-sm border-b-2 border-gray-400 outline-none"
            placeholder="Write a preview subtitle..."
          />
          <p className="text-sm text-[#828282]">
            <span className="font-semibold">Note: &nbsp;</span>
            Changes here will affect how your story appears in public places
            like homepage, not the contents of the story itself.
          </p>
        </div>

        <div className="flex flex-col gap-5 w-[100%]">
          <p className="text-sm">
            Choose topic so readers know what your story is about
          </p>
          <div>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="default"
              class="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-85 p-2.5"
            >
              <option>Choose a country</option>

              {categories.map((categ) => {
                return (
                  <option selected={categ === category} value={categ}>
                    {categ}
                  </option>
                );
              })}
            </select>
          </div>

          <p className="text-xs">
            We do not collect of your data. It's a free platform where you can
            share anything you like without login.
          </p>

          <div className="">
            <Button
              text={"Publish"}
              onClick={() => {
                toast.promise(createStory(), {
                  loading: "Publishing...",
                  success: <b>Story published!</b>,
                  error: <b>All fields required!</b>,
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Publish;
