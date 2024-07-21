"use client";

import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";


export const FeedCard: React.FC = () => {
  return (
    <>
      <div className="border-t border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-1">
            <Image
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
              alt="user-image"
              width={50}
              height={50}
            />
          </div>
          <div className="col-span-11 text-white">
            <h5>Ankit Singh</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              maxime quos illo necessitatibus alias ducimus ratione sapiente
              culpa quae magni.
            </p>
            <div className="w-[90%] flex justify-between items-center mt-5 text-xl">
              <div>
                <BiMessageRounded />
              </div>
              <div>
                <FaRetweet />
              </div>
              <div>
                <AiOutlineHeart />
              </div>
              <div>
                <BiUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
