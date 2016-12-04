CREATE PROCEDURE [dbo].[Cheques_Get]
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
	WHERE	[IsDeleted] = 0
END
