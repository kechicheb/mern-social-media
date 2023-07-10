import { IoIosArrowDown } from "react-icons/io";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;

  const [show, setShow] = useState(false);
  return (
    <div className="bg-white">
      <div className="container relative mx-auto p-6  flex justify-between items-center">
        <div className="flex gap-8">
          <p
            onClick={() => navigate("/home")}
            className="text-3xl font-bold  text-sky-400 hover:cursor-pointer hover:opacity-50 duration-150"
          >
            Sociopedia
          </p>
          <div className="flex justify-between bg-gray-100 rounded-lg px-5 py-1 gap-12 items-center">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              className="focus:outline-none bg-transparent placeholder:text-sm  placeholder:text-gray-400 "
            />
            <div className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-full duration-150">
              <AiOutlineSearch className="text-gray-500 text-xl " />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div
            className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-full duration-150"
            onClick={() => dispatch(setMode())}
          >
            {" "}
            <MdLightMode className="text-2xl  " />
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-full duration-150">
            {" "}
            <MdMessage className="text-2xl" />
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-full duration-150">
            {" "}
            <BsBellFill className="text-2xl" />
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-full duration-150">
            {" "}
            <BsFillQuestionCircleFill className="text-2xl" />
          </div>
          <div className="relative">
            <div
              onClick={() => setShow(!show)}
              className="inline-flex w-full justify-center  items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer"
            >
              {fullName} <IoIosArrowDown />
            </div>

            {show && (
              <div className="z-10  bg-white  divide-gray-100 rounded-lg shadow w-44  absolute right-0 mt-1 ">
                <ul className="py-2 text-sm text-gray-700 ">
                  <li onClick={() => navigate(`profile/${user._id}`)}>
                    <span className="block px-4 py-2 hover:bg-gray-100 hover:cursor-pointer<IoIosArrowDown />">
                      Profile
                    </span>
                  </li>

                  <li onClick={() => dispatch(setLogout())}>
                    <span className="block px-4 py-2 hover:bg-gray-100  hover:cursor-pointer">
                      Log Out
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
