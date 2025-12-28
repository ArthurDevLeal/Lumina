import CardRoot from "./card-root";
import ChartCenterLabel from "./chart/chart-center-label";
import DonutChart from "./chart/chart-donut";
import ChartHeader from "./chart/chart-header";
import ChartLegendItem from "./chart/chart-legend-item";
import ChartLegendMore from "./chart/chart-legend-more";
import ChartLegendRoot from "./chart/chart-legend-root";
import ChartRoot from "./chart/chart-root";
import CustomTooltip from "./chart/custom-tooltip";
import ContentRoot from "./content-root";
import CreditCardBalance from "./credit-card/credit-card-balance";
import CreditCardContent from "./credit-card/credit-card-content";
import CreditCardHeader from "./credit-card/credit-card-header";
import CreditCardInfo from "./credit-card/credit-card-info";
import CreditCardRoot from "./credit-card/credit-card-root";
import CreditHeader from "./credit-card/header";
import FastActionButton from "./fast-actions/button";
import GoalFastActionButton from "./fast-actions/goal/goal-fast-action-button";
import FastActionsRoot from "./fast-actions/root";
import AddGoalCard from "./goals/add-goal-card";
import GoalCard from "./goals/goal-card";
import GoalsGrid from "./goals/goal-grid";
import GoalHeader from "./goals/header";

import Header from "./header";
import LeftContentRoot from "./left-content-root";
import RightContentRoot from "./right-content-root";
import Root from "./root";
import TransactionHeader from "./transactions/transaction-header";
import TransactionItem from "./transactions/transaction-item";
import TransactionMore from "./transactions/transaction-more";

export const Dashboard = {
  Header: Header,
  Root: Root,
  ContentRoot: ContentRoot,
  LeftContentRoot: LeftContentRoot,
  RightContentRoot: RightContentRoot,
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
    Goal: GoalFastActionButton,
  },
  Chart: {
    Header: ChartHeader,
    Label: ChartCenterLabel,
    Donut: DonutChart,
    Root: ChartRoot,
    CustomTooltip: CustomTooltip,
    Legend: {
      Item: ChartLegendItem,
      Root: ChartLegendRoot,
      More: ChartLegendMore,
    },
  },
  Transaction: {
    Item: TransactionItem,
    Header: TransactionHeader,
    More: TransactionMore,
  },
  Goals: {
    GoalCard,
    GoalsGrid,
    AddGoalCard,
    Header: GoalHeader,
  },
};
