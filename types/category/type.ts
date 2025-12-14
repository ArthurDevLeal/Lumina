interface CategoryData {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  moneySpent: number;
}

export interface CreateCategoryPropsReturn {
  message: string;
  data: CategoryData;
}

export interface GetCategoryByIdPropsReturn {
  message: string;
  data: CategoryData;
}

export interface GetCategoriesPropsReturn {
  message: string;
  data: CategoryData[];
}

export interface UpdateCategoryPropsReturn {
  message: string;
  data: CategoryData;
}

export interface DeleteCategoryPropsReturn {
  message: string;
  data: CategoryData;
}

export interface SumCategoryMoneySpentPropsReturn {
  message: string;
  data: CategoryData;
}

export interface CategoryStatsPropsReturn {
  message: string;
  data: {
    id: string;
    name: string;
    moneySpent: number;
    calculatedSpent: number;
    outcomesCount: number;
  }[];
}