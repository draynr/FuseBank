import AuthForm from "../../../../components/AuthForm";
import React from "react";

const Register = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="register" />
    </section>
  );
  // return <AuthForm type="register" />;
};

export default Register;
