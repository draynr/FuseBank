import Link from "next/link";
import Image from "next/image";
import React from "react";
import Card from "./Card";

const RightSideBar = ({
  user,
  transactions,
  banks,
}: RightSideBarProps) => {
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="banner" />
        <div className="profile">
          <div className="profile-image">
            <span className="text-5xl font-bold text-blue-600 bg-inherit">
              {"J"}
            </span>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {user.first_name}
              {""} {user.last_name}
            </h1>
            <p className="profile-email">
              {user.email}
            </p>
          </div>
        </div>
      </section>
      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">
            Linked Banks
          </h2>
          <Link
            href="/"
            className="flex gap-1 text-white"
          >
            <Image
              src="/icons/add.svg"
              alt="add"
              width={25}
              height={25}
            />
            <h2 className="text-[16px] text-white font-semibold">
              Add
            </h2>
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex flex-col flex-1 items-center justify-center gap-5">
            <div className="text-white relative z-10">
              <Card
                key={banks[0].$id}
                account={banks[0]}
              />
            </div>
            {banks[1] && (
              <div className="text-white absolute right-0 top-8 z-0 w-[90%]">
                <Card
                  key={banks[1].$id}
                  account={banks[1]}
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
