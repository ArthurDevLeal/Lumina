interface GoalProgressData {
  id: string;
  createdAt: Date;
  goalId: string;
  amount: number;
}

export interface GoalData {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  type: string;
  targetValue: number;
  currentValue: number;
  finalDate: Date | null;
  status: string;
  goalProgress?: GoalProgressData[];
}

export interface CreateGoalPropsReturn {
  message: string;
  data: GoalData;
}

export interface GetGoalByIdPropsReturn {
  message: string;
  data: GoalData;
}

export interface GetGoalsPropsReturn {
  message: string;
  data: GoalData[];
}

export interface UpdateGoalPropsReturn {
  message: string;
  data: GoalData;
}

export interface DeleteGoalPropsReturn {
  message: string;
  data: GoalData;
}

export interface AddGoalProgressPropsReturn {
  message: string;
  data: {
    progress: GoalProgressData;
    goal: GoalData;
  };
}

export interface GoalStatsPropsReturn {
  message: string;
  data: {
    id: string;
    name: string;
    type: string;
    targetValue: number;
    currentValue: number;
    calculatedProgress: number;
    progressPercentage: number;
    status: string;
    progressCount: number;
  }[];
}