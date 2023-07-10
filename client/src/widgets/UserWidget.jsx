import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "../components/UserImage";
export default function UserWidget({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <div className="p-6 pb-3 rounded-xl bg-white divide-y divide-solid divide-gray-200 ">
      <div
        className="flex justify-between items-center gap-4 pb-5  "
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <div className="flex justify-between items-center gap-4">
          <UserImage image={picturePath} />
          <div>
            <h3 className=" text-gray-700 text-lg font-medium hover:cursor-pointer hover:opacity-50">
              <span> {firstName}</span>
              <span className="pl-1"> {lastName}</span>
            </h3>
            <p className="text-gray-400 text-sm">{friends.length} friends</p>
          </div>
        </div>
        <BsPersonFillGear className="text-xl" />
      </div>
      <div className="py-4">
        <div className="flex mb-2 gap-4 items-center ">
          <MdOutlineLocationOn className="text-3xl text-gray-600 " />

          <p className="text-sm text-gray-400">{location}</p>
        </div>
        <div className="flex mb-2 gap-4 items-center ">
          <MdWorkOutline className="text-3xl text-gray-600" />

          <p className="text-sm text-gray-400">{occupation}</p>
        </div>
      </div>
      <div className="py-4">
        <div className="flex mb-2 gap-4 items-center justify-between ">
          <p className="text-sm text-gray-400">Who's viewed your profile</p>
          <p className="font-medium text-sm text-gray-600">{viewedProfile}</p>
        </div>
        <div className="flex mb-2 gap-4 items-center  justify-between">
          <p className="text-sm text-gray-400">Impressions of your post</p>
          <p className="font-medium text-sm text-gray-600"> {impressions}</p>
        </div>
      </div>
      <div className="py-4">
        <p className="mb-4 font-medium text-base text-gray-600">
          {" "}
          Social Profiles
        </p>
        <div className="flex mb-2 gap-4 items-center justify-between ">
          <div className="flex  gap-4 items-center justify-between">
            <img src="../assets/twitter.png" alt="twitter" />
            <div>
              <p className="font-medium text-gray-600 text-sm"> Twitter</p>
              <p className="text-gray-400 text-sm">Social Network</p>
            </div>
          </div>
          <MdOutlineEdit className="text-xl  text-gray-600" />
        </div>
        <div className="flex mb-2 gap-4 items-center justify-between ">
          <div className="flex  gap-4 items-center justify-between">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <div>
              <p className="font-medium text-gray-600 text-sm"> Linkedin</p>
              <p className="text-gray-400 text-sm">Network Platform</p>
            </div>
          </div>
          <MdOutlineEdit className="text-xl  text-gray-600" />
        </div>
      </div>
    </div>
  );
}
