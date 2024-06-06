declare interface TopSectionProps {
  type?: "title" | "base";
  title: string;
  user_name: string;
  subtext: string;
}
declare interface BalanceBoxProps {
  accounts: Account[];
  banks: number;
  current_balance: number;
}

declare interface ChartProps {
  accounts: Account[];
}

declare interface NavBarProps {
  user: User;
}

declare interface RightSideBarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}
declare interface SideProps {
  user: User;
}

declare type User = {
  $id: string;
  email: string;
  user_id: string;
  dwolla_customer_url: string;
  dwolla_customer_id: string;
  first_name: string;
  last_name: string;
  address1: string;
  city: string;
  state: string;
  zip_code: string;
  date_of_birth: string;
  ssn: string;
};
