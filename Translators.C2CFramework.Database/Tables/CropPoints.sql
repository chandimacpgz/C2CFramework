CREATE TABLE [dbo].[CropPoints]
(
	[Id] INT NOT NULL IDENTITY(100000, 1),
	[CropType] VARCHAR(256) NOT NULL,
	[BankId] INT NOT NULL,
	[ChequeId] INT NOT NULL,
	[CropStartX] INT NOT NULL,
	[CropStartY] INT NOT NULL,
	[CropWidth] INT NOT NULL,
	[CropHeight] INT NOT NULL,
	[CreatedDate] DATETIME NULL,
	[UpdatedDate] DATETIME NULL,
	[IsDeleted] BIT NOT NULL DEFAULT(0),
	CONSTRAINT PK_CropPoints_ID PRIMARY KEY ([Id]),
	CONSTRAINT UN_CropPoints_ID UNIQUE ([BankId],[ChequeId],[CropType]),
	CONSTRAINT FK_CropPoints_BankId FOREIGN KEY ([BankId]) REFERENCES [dbo].[Banks]([Id]),
	CONSTRAINT FK_CropPoints_ChequeId FOREIGN KEY ([ChequeId]) REFERENCES [dbo].[Cheques]([Id])
)
