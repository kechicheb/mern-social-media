import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { MdOutlinePersonRemove } from "react-icons/md";
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

  console.log( _id ===friendId);
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
      <div className="flex items-center justify-between gap-3">
        <UserImage image={userPicturePath} size="55px" />
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <h5 className="font-medium text-gray-600 text-base break-keep hover:opacity-50 duration-150">
            {name}
          </h5>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div onClick={() => patchFriend()}>
        {isFriend && _id !== friendId && (
          <div className="text-cyan-700 bg-cyan-50 hover:cursor-pointer hover:opacity-50 p-3 rounded-full duration-150">
            {" "}
            <MdOutlinePersonRemove className="text-xl  " />
          </div>
        )}
        {!isFriend && _id !== friendId && (
          <div className="text-cyan-700 bg-cyan-50 hover:cursor-pointer hover:opacity-50 p-3 rounded-full duration-150">
            <MdOutlinePersonAddAlt1 className="text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
