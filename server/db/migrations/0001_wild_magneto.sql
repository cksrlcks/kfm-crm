ALTER TABLE "quotation" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "quotation" ALTER COLUMN "updated_at" SET DEFAULT now();