"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";

const ImageComponent = ({ value, onChange, onRemove, disabled }) => {
  const [isMounted, SetIsMounted] = useState(false);

  useEffect(() => {
    SetIsMounted(true);
  }, []);

  const onUpload = (value) => {
    onChange(value.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex gap-x-7 pb-5">
      <div>
        {value?.map((url) => (
          <div key={url} className="relative w-[120px] h-[120px] rounded overflow-hidden">
            <Image
              src={url}
              alt="profile"
              fill
              className=" object-cover"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="bi0zlfbw">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              onClick={onClick}
              disabled={disabled}
              className="text-white bg-blue-400"
            >
              UPLOAD NEW PHOTO
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageComponent;
