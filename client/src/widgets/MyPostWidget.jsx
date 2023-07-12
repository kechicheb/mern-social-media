import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";
import { MdOutlineGifBox } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { MdOutlineImage } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className="p-6 pb-3 rounded-xl bg-white  ">
      <div className="flex justify-between items-center gap-6">
        <UserImage image={picturePath} />
        <input
          className="w-full rounded-3xl py-4 px-8 focus:outline-none bg-gray-100 placeholder:text-gray-400 placeholder:text-sm"
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
      </div>
      {isImage && (
        <div className="border border-solid border-gray-400 p-4 rounded-md mt-4 mb-4">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-sky-300 hover:cursor-pointer p-4"
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p className="text-slate-400 text-sm">Add Picture Here</p>
                ) : (
                  <div className="flex justify-between">
                    <p className="text-sm">{image.name}</p>
                    <MdOutlineModeEditOutline className="text-xl" />
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <div className="my-5 border-y border-solid border-gray-200"></div>

      <div className="flex justify-between items-center ">
        <div
          className="flex justify-between items-center gap-1 cursor-pointer"
          onClick={() => setIsImage(!isImage)}
        >
          <MdOutlineImage className="text-gray-500 text-xl" />
          <p className="text-gray-500  hover:opacity-70 text-sm">Image</p>
        </div>

        <div className="hidden lg:flex justify-between items-center gap-1 cursor-pointer ">
          <MdOutlineGifBox className="text-gray-500 text-xl" />
          <p className="text-gray-500  hover:opacity-70 text-sm">Clip</p>
        </div>

        <div className="hidden lg:flex justify-between items-center gap-1 cursor-pointer">
          <MdOutlineAttachFile className="text-gray-500 text-xl" />
          <p className="text-gray-500  hover:opacity-70 text-sm">Attachment</p>
        </div>

        <div className="hidden lg:flex justify-between items-center gap-1 cursor-pointer">
          <MdOutlineMic className="text-gray-500 text-xl" />
          <p className="text-gray-500  hover:opacity-70 text-sm">Audio</p>
        </div>

        <div className="flex justify-between items-center gap-1 lg:hidden">
          <MdMoreHoriz className="text-gray-500" />
        </div>

        <button
          disabled={!post}
          onClick={handlePost}
          className={
            post
              ? "bg-sky-400 text-white rounded-3xl py-2 px-4 text-sm cursor-pointer "
              : "bg-sky-400 text-sky-200 opacity-75 rounded-3xl py-2 px-4 text-sm"
          }
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default MyPostWidget;
