import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import HouseCard from "../components/HouseCard";
import { homeTestData } from "../utils/mock-data";
import { userEvent } from "@testing-library/user-event";

test("Display home contents on card and links to home's page", async () => {
  render(<HouseCard home={homeTestData} />);
  expect(screen.getByRole("img")).toBeInTheDocument;
  userEvent.click(screen.getByRole("img"));
});

/**
 *   figure:

      Name "":
      <figure />

      --------------------------------------------------
      img:

      Name "home":
      <img
        alt="home"
      />

      --------------------------------------------------
      heading:

      Name "$2899000 - USD":
      <h4
        class="text-gray-500 font-bold"
      />

      Name "737 Raymond Ave Viewed":
      <h2
        class="card-title"
      />

      --------------------------------------------------

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card w-96 mx-1 my-2 bg-base-100 shadow-xl cursor-pointer"
        >
          <figure>
            <img
              alt="home"
            />
          </figure>
          <div
            class="card-body"
          >
            <div
              class="flex justify-between"
            >
              <div>
                <h4
                  class="text-gray-500 font-bold"
                >
                   
                  <span
                    class="text-blue-400 text-lg font-semibold"
                  >
                    $
                    2899000
                  </span>
                  -
                   
                  USD
                </h4>
              </div>
              <div
                class="hover:bg-slate-200 p-2 rounded-lg "
              >
                <svg
                  class="h-6 w-6 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2
                class="card-title"
              >
                737 Raymond Ave
                <div
                  class="badge bg-blue-400 border-none"
                >
                  Viewed
                </div>
              </h2>
              <p>
                Santa Monica
                 
                CA
                 
                90405
              </p>
              <div
                class="card-actions justify-between mt-5"
              >
                <div
                  class="badge badge-outline"
                >
                  Beds 
                  3
                </div>
                <div
                  class="badge badge-outline"
                >
                  Baths 
                  3
                </div>
                <div
                  class="badge badge-outline"
                >
                   
                </div>
                <div
                  class="badge badge-outline"
                >
                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
 */
