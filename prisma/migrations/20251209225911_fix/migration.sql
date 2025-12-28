/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GoalProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Income` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IncomeHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Outcome` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OutcomeHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `userId` on table `Goal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropForeignKey
ALTER TABLE "GoalProgress" DROP CONSTRAINT "GoalProgress_goalId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_incomeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeHistory" DROP CONSTRAINT "IncomeHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Outcome" DROP CONSTRAINT "Outcome_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Outcome" DROP CONSTRAINT "Outcome_outcomeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "OutcomeHistory" DROP CONSTRAINT "OutcomeHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Goal_id_seq";

-- AlterTable
ALTER TABLE "GoalProgress" DROP CONSTRAINT "GoalProgress_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "goalId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoalProgress_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoalProgress_id_seq";

-- AlterTable
ALTER TABLE "Income" DROP CONSTRAINT "Income_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "incomeHistoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Income_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Income_id_seq";

-- AlterTable
ALTER TABLE "IncomeHistory" DROP CONSTRAINT "IncomeHistory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "IncomeHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "IncomeHistory_id_seq";

-- AlterTable
ALTER TABLE "Outcome" DROP CONSTRAINT "Outcome_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "outcomeHistoryId" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Outcome_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Outcome_id_seq";

-- AlterTable
ALTER TABLE "OutcomeHistory" DROP CONSTRAINT "OutcomeHistory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OutcomeHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OutcomeHistory_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "OutcomeHistory" ADD CONSTRAINT "OutcomeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_outcomeHistoryId_fkey" FOREIGN KEY ("outcomeHistoryId") REFERENCES "OutcomeHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeHistory" ADD CONSTRAINT "IncomeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_incomeHistoryId_fkey" FOREIGN KEY ("incomeHistoryId") REFERENCES "IncomeHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalProgress" ADD CONSTRAINT "GoalProgress_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
