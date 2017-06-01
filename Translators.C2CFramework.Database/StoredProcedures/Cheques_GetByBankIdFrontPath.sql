CREATE PROCEDURE [dbo].[Cheques_GetByBankIdFrontPath]
	@BankId INT,
	@ArchievedChequeFrontPath VARCHAR(MAX)
AS
BEGIN
	SELECT	[Id],
			[Name],
			[BankId],
			[ArchievedChequeFrontPath],
			[ArchievedChequeBackPath],
			[DimensionX],
			[DimensionY],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted]  
	FROM	[Cheques]
	WHERE	[BankId]=@BankId AND [ArchievedChequeFrontPath]=@ArchievedChequeFrontPath AND [IsDeleted] = 0
END
