/*
  Warnings:

  - You are about to drop the `Interview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Interview";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user_auth_table" (
    "id" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_auth_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_table" (
    "userId" TEXT NOT NULL,
    "interviewNumber" INTEGER,
    "bio" TEXT,
    "profilePhoto" TEXT,

    CONSTRAINT "user_profile_table_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "user_interview_table" (
    "id" TEXT NOT NULL,
    "modelType" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "score" INTEGER,
    "status" TEXT NOT NULL,
    "performanceSummary" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_interview_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_table_username_key" ON "user_auth_table"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_table_email_key" ON "user_auth_table"("email");

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_auth_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interview_table" ADD CONSTRAINT "user_interview_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_auth_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
