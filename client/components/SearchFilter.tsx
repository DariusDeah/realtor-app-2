import { useRouter } from "next/router";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Home_Types } from "../models/homeTypes";
import { SearchParams } from "../types/searchParams";
import FilterBadge from "./ui/FilterBadge";

type Props = {
  toggleMapFunction: (isToggled: boolean) => void;
  mapToggled: boolean;
  submitRequestFunction: (params?: SearchParams) => void;
};

function SearchFilter({
  toggleMapFunction,
  mapToggled,
  submitRequestFunction,
}: Props) {
  const [currentFilters, setCurrentFilters] = useState<any[] | null>(null);
  const [isShowingFilters, setIsShowingFilters] = useState(false);

  const locationRef = useRef<HTMLInputElement>(null);
  const bathroomRef = useRef<HTMLSelectElement>(null);
  const bedroomRef = useRef<HTMLSelectElement>(null);
  const priceRangeRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);
  const homeTypeRef = useRef<HTMLSelectElement>(null);

  const handleSearch = () => {
    const filters: SearchParams = {
      location: locationRef.current && locationRef.current.value,
      minBathroom: bathroomRef.current && parseInt(bathroomRef.current.value),
      minBed: bedroomRef.current && parseInt(bedroomRef.current.value),
      minPrice: priceRangeRef.current && parseInt(priceRangeRef.current.value),
      sort: sortRef.current && sortRef.current.value,
      homeType: homeTypeRef.current && homeTypeRef.current.value,
    };

    submitRequestFunction({
      ...filters,
    });

    const filterValues = Object.values(filters).filter(
      (filterValue) => filterValue && filterValue.toString().length
    );
    setCurrentFilters(filterValues);
  };

  let toggleMapBtn = mapToggled ? (
    <input
      onClick={() => toggleMapFunction(false)}
      type="checkbox"
      className="toggle"
      checked
    />
  ) : (
    <input
      onClick={() => toggleMapFunction(true)}
      type="checkbox"
      className="toggle bg-red-500 "
    />
  );

  return (
    <div id="filter-box" className=" w-full items-center  ">
      {isShowingFilters && (
        <>
          <div className="bg-white p-4 font-semibold flex lg:flex-wrap flex-wrap-reverse lg:justify-between lg:items-center   ">
            <button className="btn .btn:active:hover" onClick={handleSearch}>
              Search
            </button>
            <div className="flex flex-col">
              <p>Location</p>
              <div className="bg-slate-100 flex w-fit p-2  rounded-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input placeholder="Search.." ref={locationRef} />
              </div>
            </div>

            <ul className="flex  flex-wrap gap-2">
              <li>
                <p>Bedrooms</p>
                <select name="" id="" className="select" ref={bedroomRef}>
                  <option value="0">N/A</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </li>
              <li>
                <p>Bathrooms</p>
                <select name="" id="" className="select" ref={bathroomRef}>
                  <option value="0">N/A</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </li>
              <li>
                <p>Home Type</p>
                <select name="" id="" className="select" ref={homeTypeRef}>
                  {Home_Types.map((homeType) => (
                    <option value={homeType} key={homeType}>
                      {homeType}
                    </option>
                  ))}
                </select>
              </li>

              <div>
                <label htmlFor="">Price Range</label>
                <input
                  ref={priceRangeRef}
                  type="range"
                  min="0"
                  max="200000"
                  className="range"
                  step="50000"
                />
                <div className="w-full flex justify-between text-xs px-2 space-x-3">
                  <span>0</span>
                  <span>50,000+</span>
                  <span>100,000+</span>
                  <span>150,000+</span>
                  <span>200,000+</span>
                </div>
              </div>
              <li>
                <p>Sort</p>
                <select name="" id="" className="select" ref={sortRef}>
                  <option value="">N/A</option>
                  <option value="Price_High_Low">High to Low</option>
                  <option value="Price_Low_High">Low to High</option>
                  <option value="Newest">Newest</option>
                  <option value="Square_Feet">Square Feet</option>
                </select>
              </li>
            </ul>
          </div>
        </>
      )}
      <div className="flex justify-between items-center  px-3">
        <button
          className="btn btn-xs"
          onClick={() => setIsShowingFilters(!isShowingFilters)}
        >
          {isShowingFilters ? "Hide Filters" : "Show Filters"}
        </button>
        {isShowingFilters && (
          <h4>
            current filters:
            {currentFilters?.map((filter) => (
              <span className="badge mx-1">{filter}</span>
            ))}
          </h4>
        )}
        <div>
          <div className="md:flex hidden text-sm  gap-2">
            {" "}
            View Map {toggleMapBtn}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
