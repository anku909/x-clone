"use client";
import { FeedCard } from "@/components/Feedcard";
import React, { useCallback } from "react";
import {
  BiBookmark,
  BiHash,
  BiHomeCircle,
  BiImageAlt,
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
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

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
  const { user } = useCurrentUser();
  const queryclient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified Success");

      if (verifyGoogleToken) localStorage.setItem("t_token", verifyGoogleToken);

      await queryclient.invalidateQueries(["current-user"]);
    },
    [queryclient]
  );

  const handleSelectImg = useCallback(()=> {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', "image/*")
    input.click();
  }, [])

  return (
    <>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 px-4 ml-28 relative">
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

          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageUrl && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-lg">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="h-screen overflow-y-scroll col-span-5 border-x-[0.2px] border-gray-600">
          <div className="test">
            <div className="border-t border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageUrl && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageUrl}
                      alt="user-image"
                      height={50}
                      width={50}
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                    rows={3}
                    placeholder="what's happening?"
                  ></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt onClick={handleSelectImg} className="text-2xl" />
                    <button className="text-sm font-semibold bg-[#1d9bf0] rounded-full px-4 py-1">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          {!user && (
            <div className="bg-slate-600 p-5 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter ? </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
