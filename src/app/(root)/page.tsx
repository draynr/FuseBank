import TopSection from "@/components/TopSection";
import React from "react";

const Home = () => {
  return (
    <section className="home">
      <div className="home-Content">Home</div>
      <header className="home-header">
        <TopSection
          type="base"
          title="Welcome"
          user-name={"DEV"}
          subtext="Manage your account"
        />
      </header>
    </section>
  );
};

export default Home;
