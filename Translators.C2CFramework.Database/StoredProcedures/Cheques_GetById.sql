CREATE PROCEDURE [dbo].[Cheques_GetById]
	@Id INT
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
	WHERE	[Id]=@Id AND [IsDeleted] = 0
END
