import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FriendListWidget from "../../widgets/FriendListWidget";
import MyPostWidget from "../../widgets/MyPostWidget";
import PostsWidget from "../../widgets/PostsWidget";
import UserWidget from "../../widgets/UserWidget";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 lg:pt-10 block lg:flex gap-10 justify-center">
        <div className=" basis-1/4">
          <UserWidget userId={userId} picturePath={user.picturePath} />

          <div className="mt-8 lg:mt-10">
            {" "}
            <FriendListWidget userId={userId} />
          </div>
        </div>
        <div className="basis-5/12 mt-8 lg:mt-0">
          <MyPostWidget picturePath={user.picturePath} />

          <PostsWidget userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
