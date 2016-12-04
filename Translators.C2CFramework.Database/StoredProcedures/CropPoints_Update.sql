CREATE PROCEDURE [dbo].[CropPoints_Update]
	@Id INT,
	@CropType NVARCHAR(256),
	@BankId INT,
	@ChequeId INT,
	@CropStartX INT,
	@CropStartY INT,
	@CropWidth INT,
	@CropHeight INT
AS
BEGIN
	DECLARE @UpdatedDate DATETIME

	SELECT	@UpdatedDate = GETDATE()

	UPDATE	[CropPoints]
	SET		[CropType] = @CropType, 
			[BankId] = @BankId,
			[ChequeId] = @ChequeId,
			[CropStartX] = @CropStartX,
			[CropStartY] = @CropStartY,
			[CropWidth] = @CropWidth,
			[CropHeight] = @CropHeight,
			[UpdatedDate] = @UpdatedDate
	WHERE	[Id]=@Id
END