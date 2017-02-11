CREATE PROCEDURE [dbo].[LiveChequePaths_Update]
	@Id INT,
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
	DECLARE @UpdatedDate DATETIME

	SELECT	@UpdatedDate = GETDATE()

	UPDATE	[LiveChequePaths]
	SET		[BankId] = @BankId,
			[ChequeId] = @ChequeId,
			[NumericalAmountCroppedImagePath] = @NumericalAmountCroppedImagePath,
			[AmountCroppedImagePath] = @AmountCroppedImagePath,
			[DateCroppedImagePath] = @DateCroppedImagePath,
			[MICRCroppedImagePath] = @MICRCroppedImagePath,
			[PayeeCroppedImagePath] = @PayeeCroppedImagePath,
			[SignatureCroppedImagePath] = @SignatureCroppedImagePath,
			[LiveChequeImageFrontPath] = @LiveChequeImageFrontPath,
			[LiveChequeImageBackPath] = @LiveChequeImageBackPath,
			[UpdatedDate] = @UpdatedDate
	WHERE	[Id]=@Id
END