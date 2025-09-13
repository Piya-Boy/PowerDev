-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT[],
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "features" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
