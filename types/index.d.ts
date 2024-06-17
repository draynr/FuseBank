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
  variant?: string;
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
  userId: string;
  invite_id: string;
};

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare interface getUserInfoProps {
  userId: string;
}

declare interface createBankAccountProps {
  userId: string;
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

// banking props

declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}
declare interface getInstitutionProps {
  institutionId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}
declare interface TransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface getBanksProps {
  userId: string;
}
declare interface getBankProps {
  documentId: string;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: {
    [key: string]:
      | string
      | string[]
      | undefined;
  };
};
declare type TransactionTableProps = {
  transactions: Transaction[];
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
};

declare interface BankTabProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId: string;
  type: string;
}

declare interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";
