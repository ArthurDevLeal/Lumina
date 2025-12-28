import ReportCard from "./card";
import CategoryHeader from "./category-header";
import CategoryRoot from "./category-root";
import ChartHeader from "./chart-header";
import ChartRoot from "./chart-root";
import ReportsHeader from "./reports-header";
import ReportRoot from "./root";

export const Reports = {
  Header: ReportsHeader,
  Card: ReportCard,
  Root:ReportRoot,
  Chart:{
    Header:ChartHeader,
    Root:ChartRoot,
  },
  Category:{
    Header:CategoryHeader,
    Root:CategoryRoot,
  }
};
