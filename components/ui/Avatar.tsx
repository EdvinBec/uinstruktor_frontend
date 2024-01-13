"use client";

import { checkImage } from "@/lib/user";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type AvatarProps = {
  src: string | undefined;
  alt?: string;
};

const Avatar = ({ src, alt }: AvatarProps) => {
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (src) {
      checkImage(src)
        .then((res) => {
          if (res) {
            setIsImage(true);
          } else {
            setIsImage(false);
          }
        })
        .catch((error) => {
          setIsImage(false);
        });
    } else {
      setIsImage(false);
    }
  }, [src]);

  return (
    <div className=" aspect-square bg-neutral-200 rounded-full">
      {isImage ? (
        <Image
          width={40}
          src={src!}
          height={40}
          className="rounded-full aspect-square"
          alt="User profile picture"
        />
      ) : (
        <User size={40} />
      )}
    </div>
  );
};
export default Avatar;
