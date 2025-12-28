-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropForeignKey
ALTER TABLE "GoalProgress" DROP CONSTRAINT "GoalProgress_goalId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_incomeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeHistory" DROP CONSTRAINT "IncomeHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Outcome" DROP CONSTRAINT "Outcome_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Outcome" DROP CONSTRAINT "Outcome_outcomeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "Outcome" DROP CONSTRAINT "Outcome_userId_fkey";

-- DropForeignKey
ALTER TABLE "OutcomeHistory" DROP CONSTRAINT "OutcomeHistory_userId_fkey";

-- AddForeignKey
ALTER TABLE "OutcomeHistory" ADD CONSTRAINT "OutcomeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_outcomeHistoryId_fkey" FOREIGN KEY ("outcomeHistoryId") REFERENCES "OutcomeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeHistory" ADD CONSTRAINT "IncomeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_incomeHistoryId_fkey" FOREIGN KEY ("incomeHistoryId") REFERENCES "IncomeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalProgress" ADD CONSTRAINT "GoalProgress_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
