import { Contact } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  //check if current is login
  useEffect(() => {
    const checkCurrUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    checkCurrUser();
  }, []);

  useEffect(() => {
    const getCurrent = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setavatar");
        }
      }
    };

    getCurrent();
  }, [currentUser]);

  return (
    <>
      <Contact contacts={contacts} currentUser={currentUser} />
    </>
  );
};

export default Chat;
