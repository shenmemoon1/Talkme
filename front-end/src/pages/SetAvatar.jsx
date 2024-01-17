import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets/index";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

export const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  // toast options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  // set profile image
  const setProfileImage = async () => {
    // Implement the logic to set the profile image
  };

  // get image from api
  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: "arraybuffer" }
          );
          const buffer = Buffer.from(response.data, "base64");
          newData.push(buffer.toString("base64"));
        } catch (error) {
          toast(`Error fetching image: ${error.message}`, toastOptions);
        }
      }
      setAvatars(newData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex -space-x-1 justify-center align-middle my-3">
          {isLoading ? (
            <img src={loader} alt="loading" className="mx-auto" />
          ) : (
            avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                key={index}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`Avatar ${index + 1}`}
                />
              </div>
            ))
          )}
        </div>
        <button onClick={setProfileImage} className="button mx-auto my-3">
          Set as profile picture
        </button>
        <h2 className="mt-3 text-center">
          Pick an avatar as your profile picture
        </h2>
      </div>
      <ToastContainer />
    </>
  );
};
