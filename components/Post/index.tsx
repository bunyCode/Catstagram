"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BookMarkIcon, FlagIcon, HeartIcon, SendIcon } from "../icons";
import Image from "next/image";
import { ReportComponent } from "../ReportBar";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export  function Post({ url,title, description,hearts, visualisations, user }: { url: string , user:{id:string, first_name:'text', name:string, avatar_url:string}, title: string, description:string, hearts: number, visualisations: number}) {
  const [isHeartIconPressed, setIsHeartIconPressed] = useState(false)
  const [isBookMarkIconPressed, setIsBookMarkIconPressed] = useState(false)
  
  return (
    <div className="max-w-sm md:mx-auto w-[350px] sm:w-[450px]  relative ">
      <div className="border rounded-lg flex justify-center items-center flex-col	  px-5 sm:px-10  py-3">
        <div className="flex items-center justify-between px-3 py-2 ">
          <div className="flex items-center space-x-2  gap-3 ">
            <Avatar>
              <AvatarImage
                alt="malteseloverclub"
                src={user.avatar_url || ''}
                className="object-cover"
              />
              <AvatarFallback>
                {user.name[0] || user.first_name[0]}
              </AvatarFallback>
            </Avatar>
            <section className="flex justify-between gap-8">
              <span className="font-semibold text-sm">
                {user.name || user.first_name}
              </span>
              <ReportComponent />
            </section>
          </div>
        </div>
        <section className="border border-gray-100 p-3 rounded-sm">
          <Image
            src={url}
            alt="Bichon maltes"
            className="aspect-[3/4] object-cover object-position:center "
            width="280"
            height="280"
          />
        </section>

        <div className="flex flex-col px-3 py-2   ">
          <div className="text-center">
            <span>{description}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <HeartIcon
              isHeartIconPressed={isHeartIconPressed}
              onClick={() => setIsHeartIconPressed(!isHeartIconPressed)}
              className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isHeartIconPressed ? "dark:text-white text-black" : "dark:text-white text-black"}`}
            />
            <span className="font-semibold text-sm">{hearts} Hearts</span>
            <span className="font-semibold text-sm">
              {visualisations} Views
            </span>
            <BookMarkIcon
              isBookMarkIconPressed={isBookMarkIconPressed}
              onClick={() => setIsBookMarkIconPressed(!isBookMarkIconPressed)}
              className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isBookMarkIconPressed ? "dark:text-white text-black" : "dark:text-white text-black"}`}
            />
          </div>

          <div className="text-sm text-foreground flex justify-center gap-2 p-2">
            <Link href="/about">View all comments</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="user"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI_uZuVHhIqFs9dEA95zYSwA2k9lfEMCuANQiPpWNaQQ&s"
                className="object-cover"
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="border-border border flex items-center  h-9 rounded-md">
              <Input
                className="flex-grow text-sm border-none outline-none "
                placeholder="Add a comment..."
              />
              <Button size="sm" variant="ghost">
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
