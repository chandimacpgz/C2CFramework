CREATE PROCEDURE [dbo].[CropPoints_GetByCropType]
	@BankId INT,
	@ChequeId INT,
	@SingleCropType NVARCHAR(256)
AS
BEGIN
	SELECT	[Id],
			[CropType],
			[BankId],
			[ChequeId],
			[CropStartX],
			[CropStartY],
			[CropWidth],
			[CropHeight],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted]  
	FROM	[CropPoints]
	WHERE	[BankId] = @BankId AND [ChequeId] = @ChequeId AND [CropType] = @SingleCropType  AND [IsDeleted] = 0
END