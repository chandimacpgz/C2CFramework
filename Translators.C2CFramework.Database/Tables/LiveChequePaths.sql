CREATE TABLE [dbo].[LiveChequePaths]
(
	[Id] INT NOT NULL IDENTITY(100000, 1),
	[BankId] INT NULL,
	[ChequeId] INT NULL,
	[NumericalAmountCroppedImagePath] VARCHAR(MAX) NULL,
	[AmountCroppedImagePath] VARCHAR(MAX) NULL,
	[DateCroppedImagePath] VARCHAR(MAX) NULL,
	[MICRCroppedImagePath] VARCHAR(MAX) NULL,
	[PayeeCroppedImagePath] VARCHAR(MAX) NULL,
	[SignatureCroppedImagePath] VARCHAR(MAX) NULL,
	[LiveChequeImageFrontPath] VARCHAR(MAX) NULL,
	[LiveChequeImageBackPath] VARCHAR(MAX) NULL,
	[CreatedDate] DATETIME NULL,
	[UpdatedDate] DATETIME NULL,
	[IsDeleted] BIT NOT NULL DEFAULT(0),
	CONSTRAINT FK_LiveChequePaths_BankId FOREIGN KEY ([BankId]) REFERENCES [dbo].[Banks]([Id]),
	CONSTRAINT FK_LiveChequePaths_ChequeId FOREIGN KEY ([ChequeId]) REFERENCES [dbo].[Cheques]([Id])


)
