import CardRoot from "./card-root";
import CreditCardBalance from "./credit-card/credit-card-balance";
import CreditCardContent from "./credit-card/credit-card-content";
import CreditCardHeader from "./credit-card/credit-card-header";
import CreditCardInfo from "./credit-card/credit-card-info";
import CreditCardRoot from "./credit-card/credit-card-root";
import CreditHeader from "./credit-card/header";
import FastActionButton from "./fast-actions/button";
import FastActionsRoot from "./fast-actions/root";

import Header from "./header";
import Root from "./root";

export const Dashboard = {
  Header: Header,
  Root: Root,
  Card: {
    Root: CardRoot,
  },
  CreditCard: {
    Root: CreditCardRoot,
    Header: CreditCardHeader,
    CardHeader: CreditHeader,
    Content: CreditCardContent,
    Balance: CreditCardBalance,
    Info: CreditCardInfo,
  },
  FastActions: {
    Root: FastActionsRoot,
    Button: FastActionButton,
  },
};
