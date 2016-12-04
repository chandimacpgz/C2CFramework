CREATE PROCEDURE [dbo].[CropPoints_GetById]
	@Id INT
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
	WHERE	[Id] = @Id AND [IsDeleted] = 0
END
