import Navbar from "../../components/Navbar";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../widgets/MyPostWidget";
import PostsWidget from "../../widgets/PostsWidget";
import AdvertWidget from "../../widgets/AdvertWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import { useSelector } from "react-redux";
const Home = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 lg:pt-10 block lg:flex gap-10">
        <div className="w-full lg:w-3/12">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="w-full lg:w-5/12">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <div className="w-full lg:w-3/12 ">
          <AdvertWidget />
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </div>
  );
};
export default Home;
