import Link from "next/link";
import Image from "next/image";
import React from "react";
import Card from "./Card";

const RightSideBar = ({
  user,
  transactions,
  banks,
}: RightSideBarProps) => {
  console.log(user);
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="banner" />
        <section className="profile">
          <div className="profile-image">
            <span className="text-5xl font-bold text-white bg-transparent">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="profile-info">
            <h1 className="profile-name items-center ">
              {user.name}
              <p className="profile-email items-center">
                {user.email}
              </p>
            </h1>
          </div>
        </section>
      </section>
      <section className="banks ">
        <div className="flex w-full justify-center items-center">
          <h2 className="header-2">
            Linked Banks
            <Link
              href="/"
              className="flex mt-3 text-white items-center justify-center"
            >
              <Image
                src="/icons/add.svg"
                alt="add"
                width={30}
                height={30}
                className="flex leading-5"
              />
              {/* <h2 className="text-[16px] text-white font-semibold">
              Add
            </h2> */}
            </Link>
          </h2>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex flex-col flex-1 items-center justify-center gap-4 mt-10">
            <div className="bg-transparent text-white relative z-10">
              <Card
                key={banks[0].$id}
                account={banks[0]}
                user_name={`${user.name}`}
                show_balance={false}
              />
            </div>
            {banks[1] && (
              <div className="bg-transparent text-white absolute z-0 mt-20 ml-20">
                <Card
                  key={banks[1].$id}
                  account={banks[1]}
                  user_name={`${user.name} `}
                  show_balance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSideBar;
