CREATE TABLE [dbo].[Cheques]
(
	[Id] INT NOT NULL IDENTITY(100000, 1),
	[Name] NVARCHAR(2048) NOT NULL,
	[BankId] INT NOT NULL,
	[ArchievedChequeFrontPath] VARCHAR(MAX) NOT NULL,
	[ArchievedChequeBackPath] VARCHAR(MAX) NULL,
	[DimensionX] INT NULL,
	[DimensionY] INT NULL,
	[CreatedDate] DATETIME NULL,
	[UpdatedDate] DATETIME NULL,
	[IsDeleted] BIT NOT NULL DEFAULT(0),
	CONSTRAINT PK_Cheques_ID PRIMARY KEY ([Id]),
	CONSTRAINT UN_Cheques_ID UNIQUE ([BankId],[Id],[ArchievedChequeFrontPath]),
	CONSTRAINT FK_Cheques_BankId FOREIGN KEY ([BankId]) REFERENCES [dbo].[Banks]([Id])
)
