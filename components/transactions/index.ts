import TransactionsFilters from "./transaction-filter";
import TransactionsHeader from "./transaction-header";
import TransactionsRoot from "./transaction-root";
import TransactionsEmpty from "./transaction-table-empty";
import TransactionsTableHeader from "./transaction-table-header";
import TransactionItem from "./transaction-table-item";
import TransactionsList from "./transaction-table-list";

export const Transactions = {
  Root: TransactionsRoot,
  Header: TransactionsHeader,
  Filters: TransactionsFilters,
  TableHeader: TransactionsTableHeader,
  List: TransactionsList,
  Empty: TransactionsEmpty,
  Item: TransactionItem,
};