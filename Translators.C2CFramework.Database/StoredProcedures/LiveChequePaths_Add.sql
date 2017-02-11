CREATE PROCEDURE [dbo].[LiveChequePaths_Add]
	@BankId INT,
	@ChequeId INT,
	@NumericalAmountCroppedImagePath VARCHAR(MAX),
	@AmountCroppedImagePath VARCHAR(MAX),
	@DateCroppedImagePath VARCHAR(MAX),
	@MICRCroppedImagePath VARCHAR(MAX),
	@PayeeCroppedImagePath VARCHAR(MAX),
	@SignatureCroppedImagePath VARCHAR(MAX),
	@LiveChequeImageFrontPath VARCHAR(MAX),
	@LiveChequeImageBackPath VARCHAR(MAX)
AS
BEGIN
	INSERT INTO [LiveChequePaths] (
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
		[UpdatedDate]) 
	VALUES(
		@BankId,
		@ChequeId,
		@NumericalAmountCroppedImagePath,
		@AmountCroppedImagePath,
		@DateCroppedImagePath,
		@MICRCroppedImagePath,
		@PayeeCroppedImagePath,
		@SignatureCroppedImagePath,
		@LiveChequeImageFrontPath,
		@LiveChequeImageBackPath,
		GETDATE(),
		GETDATE());
END
