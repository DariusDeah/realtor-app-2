import React, { RefObject, useRef, useState } from "react";
import { Home_Types } from "../models/homeTypes";
import { SearchParams } from "../types/searchParams";

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
      (filterValue) => filterValue !== null && filterValue.toString().length
    );
    console.log(filterValues);
    setCurrentFilters(filterValues);
  };

  let toggleMapBtn = mapToggled ? (
    <button
      onClick={() => toggleMapFunction(false)}
      className="btn-sm rounded-lg bg-white text-blue-400 active:bg-blue-400 active:text-white"
    >
      Hide Map
    </button>
  ) : (
    <button
      onClick={() => toggleMapFunction(true)}
      className="btn-sm rounded-lg bg-white text-blue-400 active:bg-blue-400 active:text-white"
    >
      View Map
    </button>
  );

  return (
    <div className="px-2 space-y-5">
      <div className="flex justify-between ">
        <div className="p-2 bg-slate-100 w-fit space-x-2 rounded-lg font-semibold">
          <button className="btn-sm rounded-lg bg-white text-blue-400 active:bg-blue-400 active:text-white">
            Rent
          </button>
          <button className="btn-sm rounded-lg bg-white text-blue-400 active:bg-blue-400 active:text-white">
            Buy
          </button>
        </div>
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
          <input placeholder="California" ref={locationRef} />
        </div>
      </div>
      <div className="bg-slate-100 p-4 font-semibold flex flex-wrap lg:justify-between align-middle">
        <button className="btn .btn:active:hover" onClick={handleSearch}>
          Search
        </button>
        <ul className="flex space-x-8 flex-wrap">
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
        <div className="md:flex hidden ">{toggleMapBtn}</div>
      </div>
      <div>
        <h4>
          current filters:
          {currentFilters?.map((filter) => (
            <span className="badge mx-1">{filter}</span>
          ))}
        </h4>
      </div>
    </div>
  );
}

export default SearchFilter;
