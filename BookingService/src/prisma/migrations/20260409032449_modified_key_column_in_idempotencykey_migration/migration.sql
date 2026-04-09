-- Add new column as nullable first so existing rows can be backfilled safely.
ALTER TABLE `idempotencykey`
  ADD COLUMN `idemKey` VARCHAR(191) NULL;

-- Preserve existing data by copying old key values into the new column.
UPDATE `idempotencykey`
SET `idemKey` = `key`
WHERE `idemKey` IS NULL;

-- Enforce final constraints and remove the old column.
ALTER TABLE `idempotencykey`
  DROP INDEX `IdempotencyKey_key_key`,
  MODIFY `idemKey` VARCHAR(191) NOT NULL,
  DROP COLUMN `key`;

CREATE UNIQUE INDEX `IdempotencyKey_idemKey_key` ON `idempotencykey`(`idemKey`);
