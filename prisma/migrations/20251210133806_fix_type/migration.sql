/*
  Warnings:

  - Changed the type of `type` on the `Income` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Outcome` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OutcomeIncomeType" AS ENUM ('Fixed', 'Variable');

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "type",
ADD COLUMN     "type" "OutcomeIncomeType" NOT NULL;

-- AlterTable
ALTER TABLE "Outcome" DROP COLUMN "type",
ADD COLUMN     "type" "OutcomeIncomeType" NOT NULL;
