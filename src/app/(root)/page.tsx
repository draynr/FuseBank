import BalanceBox from "../../../components/BalanceBox";
import RightSideBar from "../../../components/RightSideBar";
import TopSection from "../../../components/TopSection";
import React from "react";
import { getLoggedInUser } from "../../../lib/actions/actions";

const Home = async () => {
  const logged_in = await getLoggedInUser();
  // console.log(logged_in.name);
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <TopSection
            type="base"
            title="Hello,"
            user_name={
              logged_in.name.split(" ")[0]
            }
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
