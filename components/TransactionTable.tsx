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
  formatAmount,
  formatDateTime,
  removeSpecialChars,
} from "../lib/utils";

const TransactionTable = ({
  transactions,
}: TransactionTableProps) => {
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
                <TableRow key={transaction.id}>
                  <TableCell>
                    {
                      formatDateTime(
                        new Date(
                          transaction.date
                        )
                      ).dateTime
                    }
                  </TableCell>
                  <TableCell>
                    <div>
                      <h1>
                        {removeSpecialChars(
                          transaction.name
                        )}
                      </h1>
                    </div>
                  </TableCell>
                  <TableCell>
                    {transaction.paymentChannel}
                  </TableCell>
                  <TableCell>
                    {transaction.category}
                  </TableCell>
                  <TableCell>
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
