import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  PlaidLink,
  PlaidLinkOnSuccess,
  usePlaidLink,
} from "react-plaid-link";
import {
  createLinkToken,
  exchangePublicToken,
} from "../lib/actions/actions";

const PlaidLinking = ({
  user,
  variant = "primary",
}: PlaidProps) => {
  const [token, setToken] = useState("");
  const router = useRouter();
  // console.log(user.$id);
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);
  const onSuccess =
    useCallback<PlaidLinkOnSuccess>(
      async (public_token: string) => {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push("/");
      },
      [user]
    );
  const config = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaid-link-primary"
        >
          Connect
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect</Button>
      ) : (
        <Button>Connectx</Button>
      )}
    </>
  );
};

export default PlaidLinking;
