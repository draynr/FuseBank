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
  firstName: string;
  lastName: string;
  primaryAddress: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
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
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  primaryAddress: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
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

declare interface getUserInfoProps {
  userId: string;
}

declare interface createBankAccountProps {
  user_id: string;
  bank_id: string;
  account_id: string;
  access_token: string;
  funding_source: string;
  invite_id: string;
}

/*DWOLLA*/

declare interface AddFundingSourceParams {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}
declare interface CreateFundingSourceOptions {
  customerId: string;
  fundingSourceName: string;
  plaidToken: string;
  _links: object;
}
declare interface NewDwollaCustomerParams {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

declare interface TransferParams {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}
