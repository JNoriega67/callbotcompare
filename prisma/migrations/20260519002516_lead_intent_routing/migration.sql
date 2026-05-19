-- Lead schema: intent, derived routing, urgency flag.
-- Supports the redesigned contact flow where visitors pick an intent
-- (comparing options / implementation help / support / other) and
-- the server derives a routing bucket from it.

ALTER TABLE "Lead"
  ADD COLUMN "intent" TEXT,
  ADD COLUMN "routing" TEXT,
  ADD COLUMN "isUrgent" BOOLEAN;
