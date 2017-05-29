CREATE PROCEDURE [dbo].[Cheques_GetByChequePath]
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
	WHERE	[ArchievedChequeFrontPath]=@ArchievedChequeFrontPath AND [IsDeleted] = 0
END
