import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FiFacebook, FiTwitter } from "react-icons/fi";

const SharePopup = ({ url, title }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Share this post</h2>
        <div className="flex space-x-4">
          <FacebookShareButton url={url} quote={title}>
            <button className="p-2 rounded-full bg-blue-500 text-white">
              <FiFacebook />
            </button>
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <button className="p-2 rounded-full bg-blue-400 text-white">
              <FiTwitter />
            </button>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};
export default SharePopup;
