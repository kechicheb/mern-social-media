import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { MdChatBubbleOutline } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

import Friend from "../components/Friend";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FiFacebook, FiTwitter } from "react-icons/fi";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  let ref = useRef(postId);

  const handleShare = (ref) => {
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("flex");
    } else {
      ref.current.classList.remove("flex");
      ref.current.classList.add("hidden");
    }
  };

  return (
    <div className="my-8 bg-white p-6 rounded-xl">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="mt-4 text-gray-500 text-sm">{description}</p>
      {picturePath && (
        <img
          className="w-full h-auto rounded-xl mt-3"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className="flex justify-between items-center mt-2">
        <div className="flex justify-between items-center gap-6">
          <div className="flex justify-between items-center gap-1">
            <div onClick={patchLike}>
              {isLiked ? (
                <div className="text-sky-400 hover:bg-gray-100 hover:cursor-pointer  p-2 rounded-full duration-150">
                  {" "}
                  <MdOutlineFavorite className="text-xl " />
                </div>
              ) : (
                <div className="text-gray-500 hover:bg-gray-100 hover:cursor-pointer  p-2 rounded-full duration-150">
                  <MdFavoriteBorder className="text-xl" />
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm">{likeCount}</p>
          </div>

          <div className="flex justify-between items-center gap-1">
            <div
              onClick={() => setIsComments(!isComments)}
              className="text-gray-500 hover:bg-gray-100 hover:cursor-pointer  p-2 rounded-full duration-150"
            >
              <MdChatBubbleOutline className="text-xl" />
            </div>
            <p className="text-gray-600 text-sm">{comments.length}</p>
          </div>
        </div>

        <div className="text-gray-500 hover:bg-gray-100 hover:cursor-pointer  p-2 rounded-full duration-150">
          <BiShareAlt className="text-xl " onClick={() => handleShare(ref)} />
        </div>
      </div>
      {isComments && (
        <div className="mt-2 divide-y divide-solid divide-gray-200">
          {comments.map((comment, i) => (
            <div
              key={`${name}-${i}`}
              className="divide-y divide-solid divide-gray-200"
            >
              <p className="pl-4 my-2">{comment}</p>
            </div>
          ))}
        </div>
      )}

      <div
        className="fixed inset-0   items-center justify-center bg-gray-900 bg-opacity-50 hidden"
        ref={ref}
      >
        <div className="bg-white  rounded-lg shadow-lg pt-3">
          <div className="grid">
            {" "}
            <AiOutlineCloseCircle
              className="place-self-end text-2xl text-gray-600 mt-2 mr-2 mb-4 cursor-pointer"
              onClick={() => handleShare(ref)}
            />
          </div>
          <p className="text-base text-gray-600  mb-4 px-6">Share this post</p>

          <div className="flex space-x-4 px-6 pb-3">
            <FacebookShareButton url={window.location.href} quote="post">
              <button className="p-2 rounded-full bg-blue-500 text-white">
                <FiFacebook />
              </button>
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href} title="post">
              <button className="p-2 rounded-full bg-blue-400 text-white">
                <FiTwitter />
              </button>
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWidget;
