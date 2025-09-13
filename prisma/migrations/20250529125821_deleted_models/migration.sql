-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT[],
    "content" TEXT NOT NULL,
    "image" TEXT,
    "profile_link" TEXT,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
