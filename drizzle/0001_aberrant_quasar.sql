CREATE TABLE `bank_accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accountTitle` varchar(255) NOT NULL,
	`accountNumber` varchar(50) NOT NULL,
	`bankName` varchar(255) NOT NULL,
	`iban` varchar(34),
	`isDefault` boolean NOT NULL DEFAULT false,
	`isVerified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bank_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `card_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cardId` int NOT NULL,
	`userId` int NOT NULL,
	`merchant` varchar(255),
	`amount` int NOT NULL,
	`type` enum('purchase','withdrawal','refund','fee') NOT NULL,
	`status` enum('pending','completed','failed','reversed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `card_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`cardNumber` varchar(19) NOT NULL,
	`cardHolderName` varchar(255) NOT NULL,
	`expiryMonth` int NOT NULL,
	`expiryYear` int NOT NULL,
	`balance` int NOT NULL DEFAULT 0,
	`status` enum('active','locked','expired','cancelled') NOT NULL DEFAULT 'active',
	`dailyLimit` int,
	`monthlyLimit` int,
	`alertsEnabled` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `salary_advances` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bankAccountId` int NOT NULL,
	`amount` int NOT NULL,
	`serviceFee` int NOT NULL,
	`totalAmount` int NOT NULL,
	`status` enum('pending','in_progress','approved','rejected','completed','failed') NOT NULL DEFAULT 'pending',
	`requestedAt` timestamp NOT NULL DEFAULT (now()),
	`processedAt` timestamp,
	`completedAt` timestamp,
	`notes` text,
	CONSTRAINT `salary_advances_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`salaryAdvanceId` int,
	`type` enum('salary_advance','repayment','fee','refund','transfer') NOT NULL,
	`amount` int NOT NULL,
	`status` enum('pending','in_progress','successful','failed') NOT NULL DEFAULT 'pending',
	`description` text,
	`referenceNumber` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phoneNumber` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `nationalId` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `company` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `netSalary` int;--> statement-breakpoint
ALTER TABLE `users` ADD `currency` varchar(3) DEFAULT 'MAD' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `kycStatus` enum('pending','in_progress','verified','rejected') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `kycCompletedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `pin` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `addressLine1` text;--> statement-breakpoint
ALTER TABLE `users` ADD `addressLine2` text;--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `postalCode` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `country` varchar(100) DEFAULT 'Morocco';