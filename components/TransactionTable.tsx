import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  removeSpecialChars,
} from "../lib/utils";

const TransactionTable = ({
  transactions,
}: TransactionTableProps) => {
  const getCategory = ({
    category,
  }: CategoryProps) => {
    return (
      <div className={cn("category-badge")}>
        <div
          className={cn("size-2 rounded-full")}
        ></div>
      </div>
    );
  };
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">
              Date
            </TableHead>
            <TableHead className="px-2">
              Transaction
            </TableHead>

            <TableHead className="px-2 max-md:hidden">
              Type
            </TableHead>
            <TableHead className="px-2 max-md:hidden">
              Category
            </TableHead>
            <TableHead className="text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(
            (transaction: Transaction) => {
              const amount = formatAmount(
                transaction.amount
              );
              return (
                <TableRow
                  className={`${
                    transaction.type ===
                    ("debit" ||
                      amount[0] === "-")
                      ? "text-red-500"
                      : "text-green-500"
                  } !over:bg-none`}
                  key={transaction.id}
                >
                  <TableCell>
                    {
                      formatDateTime(
                        new Date(
                          transaction.date
                        )
                      ).dateTime
                    }
                  </TableCell>
                  <TableCell className="max-w-[250px] pl-2 pr-10">
                    <div className="flex items-center gap-3">
                      <h1 className="text-[14px] truncate font-semibold">
                        {removeSpecialChars(
                          transaction.name
                        )}
                      </h1>
                    </div>
                  </TableCell>
                  <TableCell className="pl-2 pr-10">
                    {transaction.paymentChannel}
                  </TableCell>
                  <TableCell className="pl-2 pr-10">
                    {transaction.category}
                  </TableCell>
                  <TableCell
                    className={`${
                      transaction.type ===
                        "debit" ||
                      amount[0] === "-"
                        ? "text-red-500"
                        : "text-green-500"
                    } pl-2 pr-10 font-semibold`}
                  >
                    {transaction.type ===
                    "debit"
                      ? -amount
                      : amount}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
