import BalanceBox from "../../../components/BalanceBox";
import RightSideBar from "../../../components/RightSideBar";
import TopSection from "../../../components/TopSection";
import React from "react";
import { getLoggedInUser } from "../../../lib/actions/actions";
import {
  getAccount,
  getAccounts,
} from "../../../lib/actions/bank_actions";
import RecentTransactions from "../../../components/RecentTransactions";

const Home = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string);
  const logged_in = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: logged_in.$id,
  });
  logged_in.name = `${logged_in.firstName} ${logged_in.lastName}`;

  if (!accounts) {
    return;
  }
  const appwriteItemId =
    (id as string) ||
    accounts?.data[0]?.appwriteItemId;
  const account = await getAccount({
    appwriteItemId,
  });
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <TopSection
            type="base"
            title="Welcome to fuse, "
            user_name={logged_in.firstName}
            subtext="Manage all your finances in one place."
          />
          <RightSideBar
            user={logged_in}
            transactions={[]}
            banks={accounts?.data?.slice(0, 2)}
          />
          <BalanceBox
            accounts={accounts?.data}
            banks={accounts?.totalBanks}
            current_balance={
              accounts?.totalCurrentBalance
            }
          />
        </header>
        <RecentTransactions
          accounts={accounts?.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
    </section>
  );
};

export default Home;
