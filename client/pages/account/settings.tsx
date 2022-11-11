import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useAppSelector } from "../../redux";
import { selectUser } from "../../redux/user.reducer";

type Props = {};

function settings({}: Props) {
  // const user = useAppSelector(selectUser);
  const user = {
    user: {
      fullName: "Jimmy Kramer",
      email: "jimmy.kramer@gmail.com",
      photoUrl:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      membershipStatus: "Base",
      timezone: "Mountain Time / Boise",
      zipcode: "83709",
      state: "Idaho",
      housingPreference: "Apartment",
    },
  };
  const router = useRouter();
  // const [currentTab, setCurrentTab] = useState(1);

  const ProfileTabContent = (
    <div className="flex flex-col w-full  gap-5  ">
      <div className="flex">
        <Image
          src={user.user.photoUrl}
          width={100}
          height={100}
          className="rounded-full "
        />

        <div className="flex flex-col justify-center ml-5 gap-1">
          <p>{user.user.fullName.split(" ").join(" ")} </p>
          <div className="flex items-center gap-3">
            <p>{user.user.membershipStatus} Account</p>
            <button className=" btn btn-outline btn-xs">Upgrade</button>
          </div>
        </div>
      </div>
      <div className="divider"></div>

      {/* inputs */}
      <div className="lg:flex justify-between ">
        <h2 className="font-semibold text-xl mb-3 lg:mb-0">User Info</h2>
        <section className=" grid grid-cols-2 gap-7 lg:w-3/4">
          <div className="flex flex-col justify-start ">
            <label htmlFor="firstName " className="text-gray-500">
              First Name
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className="input input-bordered rounded-md  flex-1  "
                name="firstName"
                value={user.user.fullName.split(" ")[0]}
              />
              <button className="selectable">Edit</button>
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <label htmlFor="firstName">Last Name</label>
            <input type="text" className="input input-bordered rounded-md " />
          </div>
          <div className="flex flex-col justify-start">
            <label htmlFor="firstName">Email</label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="flex flex-col justify-start">
            <label htmlFor="firstName">Phone</label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="flex flex-col justify-start">
            <label htmlFor="firstName">Address</label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="flex flex-col justify-start">
            <label htmlFor="firstName">State</label>
            <select className="select select-bordered w-full ">
              <option disabled selected></option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
        </section>
      </div>
      {/* inputs */}
      <div className="divider"></div>
      <div className="lg:flex justify-between items-start">
        <h2 className="font-semibold text-xl mb-3 lg:mb-0">Preferences</h2>
        <div className="lg:grid grid-cols-4 justify-between lg:w-3/4  gap-x-10 gap-5">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Dark Mode</span>
              <input type="checkbox" className="toggle" checked />
            </label>
          </div>
          <div className="flex items-center lg:gap-x-2 ">
            <label htmlFor="Lang">Language</label>
            <select className="select select-xs select-bordered  ">
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Always Display Filters</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
          <div className="flex items-center lg:gap-x-2 ">
            <label htmlFor="salary range">Salary Range</label>
            <select className="select select-xs select-bordered  ">
              <option value="0-20,000">0 - 20,000</option>
              <option value="20,000-40,000">20,000 - 40,000</option>
              <option value="40,000 - 80,000">40,000 - 80,000</option>
              <option value=" 80,000 - 100,000+"> 80,000 - 100,000+</option>
            </select>
          </div>
          <div className="flex items-center lg:gap-x-2 ">
            <label htmlFor="budger">Budget Range</label>
            <select className="select select-xs select-bordered  ">
              <option value="0-20,000">0 - 20,000</option>
              <option value="20,000-40,000">20,000 - 40,000</option>
              <option value="40,000 - 80,000">40,000 - 80,000</option>
              <option value=" 80,000 - 100,000+"> 80,000 - 100,000+</option>
            </select>
          </div>
          <div className="flex items-center lg:gap-x-2 ">
            <label htmlFor="Lang">Searching For</label>
            <select className="select select-xs select-bordered  ">
              <option value="Home">Home</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
          <div className="flex items-center lg:gap-x-2 ">
            <label htmlFor="Lang">Beds</label>
            <select className="select select-xs select-bordered rounded-md  ">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>
          <div className="flex items-center lg:gap-x-2 ">
            <label htmlFor="Lang">Baths</label>
            <select className="select select-xs select-bordered rounded-md  ">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
  useEffect(() => {
    // if (!user.user) {
    //   router.push("/sign-up");
    // }
  }, []);
  return !user.user ? (
    <div className="lg:flex">
      <Header />
      <section className="w-full flex flex-col items-center space-y-10"></section>
    </div>
  ) : (
    <div className="lg:flex">
      <Header />
      <section className="w-full flex  flex-col lg:m-10 gap-5 ">
        <section className=" flex flex-col items-center gap-5">
          <h1 className="text-3xl lg:text-5xl font-semibold">
            Settings - Profile
          </h1>
          <div className="tabs ">
            <a className="tab tab-bordered tab-active">Profile </a>
            <a className="tab tab-bordered ">Payment {"&"} Billing</a>
            <a className="tab tab-bordered">Account </a>
          </div>
        </section>
        <section className=" flex flex-col gap-10">
          <div>{ProfileTabContent}</div>
          <div className="w-full flex justify-end">
            <button className=" btn   btn-success text-end ">Update</button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default settings;
