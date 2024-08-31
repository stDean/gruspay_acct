import { Coins, Receipt, ReceiptText, ScrollText, Table } from "lucide-react";

export const AccountsLinks = [
  { label: "Journal Entry", Icon: Coins, link: "/transaction" },
  { label: "Ledger", Icon: ScrollText, link: "/ledger" },
  { label: "Trial Balance", Icon: ReceiptText, link: "/trial-balance" },
  { label: "Financial Statement", Icon: Receipt, link: "/statement" },
];

export const InvoiceLink = [
  { label: "New Invoice", Icon: ReceiptText, link: "/invoice" },
  { label: "Invoice History", Icon: Table, link: "/invoice/history" },
];
