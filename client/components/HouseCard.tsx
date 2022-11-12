import Link from "next/link";
import React, { useState } from "react";
import { testUser } from "../utils/mock-user";

type Props = {
  home: any;
  homeImg: string;
};
//because of the dynamics od this card we need to make this component more flexible

function HouseCard({ home, homeImg }: Props) {
  const [likedCard, setLikedCard] = useState(false);
  const user = testUser;
  let cardHeartIcon = likedCard ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7  text-red-500 cursor-pointer"
      viewBox="0 0 24 24"
      fill="currentColor"
      onClick={() => setLikedCard(false)}
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      onClick={() => setLikedCard(true)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  return (
    <div className="card w-96 mx-1 my-2 bg-base-100 shadow-xl cursor-pointer">
      <Link href={`/home-details/${home.zpid}`}>
        <figure>{<img src={homeImg} alt="home" />}</figure>
      </Link>
      <div className="card-body">
        <div className="flex items-center">
          <div className="flex-1">
            <h4 className="text-gray-500 font-bold">
              {" "}
              <span className="text-blue-400 text-lg font-semibold">
                ${home.price}
              </span>
              {home.listingStatus === "FOR_RENT" ? "/mo" : ""}- {home.currency}
            </h4>
          </div>
          <div className="divider-vertical "></div>
          <div className="selectable z-50  ">{cardHeartIcon}</div>
        </div>
        <div>
          {typeof home.address === "string" ? (
            <>
              <div className="font-semibold  space-x-2">
                {user.user.recentlyViewed.includes(home.zpid) && (
                  <div className="badge bg-blue-400 border-none ">
                    <p>Recently Viewed 👁️ </p>
                  </div>
                )}
                {home.price <= user.user.housingPreferences.budget.max &&
                  home.price >= user.user.housingPreferences.budget.min && (
                    <div className="badge bg-success  border-none w-fit">
                      <p>Within Budget 🥳</p>
                    </div>
                  )}
                {home.bedrooms === user.user.housingPreferences.bed && (
                  <div className="badge bg-indigo-300  border-none w-fit">
                    <p>Perfect Match 🤩</p>
                  </div>
                )}
                {home.price > user.user.housingPreferences.budget.max && (
                  <div className="badge bg-error border-none w-fit">
                    <p>Over Budget 💸</p>
                  </div>
                )}
              </div>
              <h2 className="card-title">{home.address.split(",")[0]}</h2>
              <p>
                {home.address.split(",")[1]} {home.address.split(",")[2]}
              </p>
            </>
          ) : (
            <>
              <h2 className="card-title">
                {home.address.streetAddress}
                <div className="badge bg-blue-400 border-none">Viewed</div>
              </h2>
              <p>
                {home.address.city} {home.address.state} {home.address.zipcode}
              </p>
            </>
          )}
          <div className="divider"></div>

          <div className="card-actions justify-between mt-5">
            <div className="badge badge-outline">Beds {home.bedrooms}</div>
            <div className="badge badge-outline">Baths {home.bathrooms}</div>
            <div className="badge badge-outline"> {home.propertyType}</div>
            <div className="badge badge-outline">
              {home.lotAreaValue} {home.lotAreaUnit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;
