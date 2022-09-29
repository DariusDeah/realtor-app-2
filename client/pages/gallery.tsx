import React, { useEffect, useState } from "react";
import { setTimeout } from "timers";
import Header from "../components/Header";
import Loader from "../components/ui/Loader";
import { fetchGalleryPhotos } from "../utils/requests";
import { motion } from "framer-motion";
type Props = {};

function gallery({}: Props) {
  const [imgs, setImgs] = useState<any>([]);

  useEffect(() => {
    async function fetchPhotos() {
      const response = await fetchGalleryPhotos();
      if (response) {
        setImgs(response);
      }
    }
    setTimeout(() => {
      fetchPhotos();
    }, 1000);
  }, []);

  return (
    <div className="lg:flex">
      <Header />

      {imgs && imgs.length ? (
        <section className="overflow-auto h-screen p-2">
          <div className="grid lg:grid-cols-4 grid-cols-2 place-items-end  ">
            {imgs.map((img: any) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: "easeIn", duration: 1 }}
              >
                <div className="flex flex-col">
                  <img src={img.urls.regular} className="p-1 rounded-xl" />
                  <p>
                    {new Date(img.created_at).toDateString()} -
                    {img.user.first_name}
                    {img.user.last_name} • @{img.user.username}
                    <img
                      src={img.user.profile_image.small}
                      alt=""
                      className="rounded-full"
                    />
                  </p>
                  <p className="flex">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {img.views} views
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default gallery;
