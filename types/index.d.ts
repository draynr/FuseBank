declare interface AuthProps {
  type: string;
}
declare interface BalanceBoxProps {
  accounts: Account[];
  banks: number;
  current_balance: number;
}
declare interface CardProps {
  account: Account;
  user_name: string;
  show_balance?: boolean;
}

declare interface ChartProps {
  accounts: Account[];
}
declare interface ExchangeProps {
  publicToken: string;
  user: User;
}
declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface NavBarProps {
  user: User;
}

declare interface LoginParameters {
  email: string;
  password: string;
}
declare interface PlaidProps {
  user: User;
  variant: string;
}
declare interface RegisterParameters {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  primaryAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dob?: string;
  ssn?: string;
}

declare interface RightSideBarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}
declare interface SideProps {
  user: User;
}

declare interface TopSectionProps {
  type?: "title" | "base";
  title: string;
  user_name: string;
  subtext: string;
}
declare type User = {
  $id: string;
  email: string;
  user_id: string;
  dwolla_customer_url: string;
  dwolla_customer_id: string;
  first_name: string;
  last_name: string;
  name: string;
  primaryAddress: string;
  city: string;
  state: string;
  zip_code: string;
  dob: string;
  ssn: string;
};
declare type Bank = {
  $id: string;
  account_id: string;
  bank_id: string;
  access_token: string;
  funding_source: string;
  user_id: string;
  invite_id: string;
};
