import BalanceBox from "../components/BalanceBox";
import TopSection from "../components/TopSection";
import React from "react";

const Home = () => {
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
          <BalanceBox
            accounts={[]}
            banks={1}
            current_balance={696969.23}
          />
        </header>
      </div>
    </section>
  );
};

export default Home;
