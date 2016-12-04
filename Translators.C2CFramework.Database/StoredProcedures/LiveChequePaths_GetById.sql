CREATE PROCEDURE [dbo].[LiveChequePaths_GetById]
	@Id INT
AS
BEGIN
	SELECT	[Id],
			[BankId],
			[ChequeId],
			[NumericalAmountCroppedImagePath],
			[AmountCroppedImagePath],
			[DateCroppedImagePath],
			[MICRCroppedImagePath],
			[SignatureCroppedImagePath],
			[LiveChequeImageFrontPath],
			[LiveChequeImageBackPath], 
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted]  
	FROM	[LiveChequePaths]
	WHERE	[Id] = @Id AND [IsDeleted] = 0
END
