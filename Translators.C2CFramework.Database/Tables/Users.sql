﻿CREATE TABLE [dbo].[Users]
(
	[Id] INT PRIMARY KEY,
	[Name] NVARCHAR(2048) NOT NULL,
	[AccountNumber] NVARCHAR(2048) NOT NULL,
	[Balance] FLOAT NULL,
	[Email] NVARCHAR(2048) NOT NULL,
	[CreatedDate] DATETIME NULL,
	[UpdatedDate] DATETIME NULL,
	[IsDeleted] BIT NOT NULL DEFAULT(0),
)
