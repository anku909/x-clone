"use client";
import { FeedCard } from "@/components/Feedcard";
import React, { useCallback } from "react";
import {
  BiBookmark,
  BiHash,
  BiHomeCircle,
  BiMessage,
  BiMoney,
  BiNotification,
  BiUser,
} from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";



interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const siderbarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BiNotification />,
  },
  {
    title: "Messages",
    icon: <BiMessage />,
  },
  {
    title: "Bookmarks",
    icon: <BiBookmark />,
  },
  {
    title: "Moneyfy",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];

export default function Home() {

  const handleLoginWithGoogle = useCallback(async(cred: CredentialResponse) => {
      const googleToken = cred.credential
      if(!googleToken) return toast.error(`Google token nnot found`);
      const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken})
      toast.success('Verified Sucess');
      console.log(verifyGoogleToken)

      if(verifyGoogleToken) localStorage.setItem('t_token', verifyGoogleToken)

  }, [])

  return (
    <>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 px-4 ml-28">
          <div className="text-2xl w-fit h-fit hover:bg-gray-600 p-4 rounded-full cursor-pointer transition-all">
            <RiTwitterXFill />
          </div>
          <div className="mt-1 text-xl font-semibold pr-6">
            <ul>
              {siderbarMenuItems.map((item, idx) => (
                <li
                  key={idx}
                  className="w-fit flex justify-start items-center gap-4 hover:bg-gray-600 px-3 py-2 rounded-full cursor-pointer mt-2 "
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="w-full p-2 text-lg font-semibold bg-[#1d9bf0] rounded-full">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="h-screen overflow-y-scroll col-span-5 border-x-[0.2px] border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="bg-slate-600 p-5 rounded-lg">
            <h1 className="my-2 text-2xl">New to Twitter ? </h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </>
  );
}
