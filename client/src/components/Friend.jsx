import { BsFillPersonDashFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";

import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        <UserImage image={userPicturePath} size="55px" />
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <p className="font-medium text-gray-500 text-base">{name}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div onClick={() => patchFriend()} className="p-3">
        {isFriend ? (
          <div className="text-cyan-700 bg-cyan-50 hover:cursor-pointer hover:opacity-50 p-3 rounded-full duration-150">
            {" "}
            <BsFillPersonDashFill className="text-xl  " />
          </div>
        ) : (
          <BsFillPersonPlusFill />
        )}
      </div>
    </div>
  );
};

export default Friend;
