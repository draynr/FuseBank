import BalanceBox from "../components/BalanceBox";
import RightSideBar from "../components/RightSideBar";
import TopSection from "../components/TopSection";
import React from "react";

const Home = () => {
  const logged_in = {
    first_name: "John",
    last_name: "Doe",
    email: "test@gmail.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <TopSection
            type="base"
            title="Hello,"
            user_name={"DEV"}
            subtext="Manage your bank accounts in one place."
          />
          <RightSideBar
            user={logged_in}
            transactions={[]}
            banks={[{}, {}, {}]}
          />
          <BalanceBox
            accounts={[]}
            banks={1}
            current_balance={696969.23}
          />
        </header>
        TRANSACTIONS
      </div>
    </section>
  );
};

export default Home;
