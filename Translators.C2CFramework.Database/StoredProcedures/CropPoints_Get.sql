CREATE PROCEDURE [dbo].[CropPoints_Get]
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
	WHERE	[IsDeleted] = 0
END
