CREATE PROCEDURE [dbo].[LiveChequePaths_Get]
AS
BEGIN
	SELECT	[Id],
			[BankId],
			[ChequeId],
			[NumericalAmountCroppedImagePath],
			[AmountCroppedImagePath],
			[DateCroppedImagePath],
			[MICRCroppedImagePath],
			[PayeeCroppedImagePath],
			[SignatureCroppedImagePath],
			[LiveChequeImageFrontPath],
			[LiveChequeImageBackPath], 
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted]  
	FROM	[LiveChequePaths]
	WHERE	[IsDeleted] = 0
END
