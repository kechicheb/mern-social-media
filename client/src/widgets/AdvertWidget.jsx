import React from "react";

export default function AdvertWidget() {
  return (
    <div className=" p-6 pb-3 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray-700 text-lg"> Sponsored</p>
        <p className="text-sm text-gray-400">Create Ad</p>
      </div>
      <img
        className="h-auto w-full rounded-xl my-3"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
      />
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">MikaCosmetics</p>
        <p className="text-sm text-gray-400">mikacosmetics.com</p>
      </div>
      <p className="my-2 text-gray-400 text-sm">
        {" "}
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </p>
    </div>
  );
}
