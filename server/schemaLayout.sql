CREATE TABLE `Student` (
	`firstName` TEXT NOT NULL,
	`lastName` TEXT NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Teacher` (
	`firstName` TEXT NOT NULL,
	`lastName` TEXT NOT NULL,
	`id` TEXT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Class` (
	`name` TEXT NOT NULL,
	`teacherId` TEXT NOT NULL,
	`id` TEXT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Question` (
	`pageId` INT NOT NULL,
	`studentId` INT NOT NULL,
	`projectId` TEXT NOT NULL,
	`studentInput` TEXT NOT NULL,
	`solution` TEXT NOT NULL
);

CREATE TABLE `Project` (
	`name` TEXT NOT NULL,
	`subject` TEXT NOT NULL,
	`projectName` TEXT NOT NULL,
	`teacherId` TEXT NOT NULL,
	`id` TEXT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Page` (
	`title` TEXT NOT NULL,
	`content` TEXT NOT NULL,
	`index` INT NOT NULL,
	`projectId` INT NOT NULL,
	`solution` TEXT NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `StudentProject` (
	`studentId` INT NOT NULL,
	`projectId` INT NOT NULL
);

CREATE TABLE `StudentClass` (
	`studentId` INT NOT NULL,
	`classId` INT NOT NULL
);

ALTER TABLE `Class` ADD CONSTRAINT `Class_fk0` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`);

ALTER TABLE `Question` ADD CONSTRAINT `Question_fk0` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`);

ALTER TABLE `Question` ADD CONSTRAINT `Question_fk1` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`);

ALTER TABLE `Question` ADD CONSTRAINT `Question_fk2` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`);

ALTER TABLE `Question` ADD CONSTRAINT `Question_fk3` FOREIGN KEY (`solution`) REFERENCES `Page`(`solution`);

ALTER TABLE `Project` ADD CONSTRAINT `Project_fk0` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`);

ALTER TABLE `Page` ADD CONSTRAINT `Page_fk0` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`);

ALTER TABLE `StudentProject` ADD CONSTRAINT `StudentProject_fk0` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`);

ALTER TABLE `StudentProject` ADD CONSTRAINT `StudentProject_fk1` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`);

ALTER TABLE `StudentClass` ADD CONSTRAINT `StudentClass_fk0` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`);

ALTER TABLE `StudentClass` ADD CONSTRAINT `StudentClass_fk1` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`);

