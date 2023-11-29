"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const InfoBox = ({ today, lastday }) => {
  const todaysale = today > 0 ? today : 1;
  const lastdaysale = lastday > 0 ? lastday : 1;

  const TodayPercenatge = ((todaysale - lastdaysale) / lastdaysale) * 100;
  const PercentageValue = Math.min(TodayPercenatge, 200);


  return (
    <div className="col-span-full lg:col-span-8 bg-card rounded-md shadow-md">
      <div className="flex items-end justify-between overflow-hidden flex-col-reverse lg:flex-row">
        <div className=" basis-[60%] flex-col space-y-8 p-6">
          {PercentageValue && PercentageValue > 0 ? (
            <>
              <h3 className="text-xl font-bold text-[#696cff]">
                Congratulations Shahmir! 🎉
              </h3>
              <p className="text-md font-[500] text-[#979191]">
                You have done {PercentageValue.toFixed(2)}% 🤩 more sales today.
                Check your new raising badge in your profile.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-[#696cff]">
                Hope for the best Shahmir! 📉
              </h3>
              <p className="text-md font-[500] text-[#979191]">
                Your sale decrease {PercentageValue.toFixed(2)}% 😔 today.
                Check your new raising badge in your profile.
              </p>
            </>
          )}

          <Button>View badge</Button>
        </div>
        <div className="basis-[40%] relative flex w-full items-end justify-center mt-10">
          <Image
            src="https://sneat-vuetify-admin-template.vercel.app/assets/illustration-john-light-0061869a.png"
            alt=""
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
