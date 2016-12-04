CREATE PROCEDURE [dbo].[CropPoints_Delete]
	@Id INT
AS
BEGIN
	DECLARE @DeletedDate DATETIME

	SELECT	@DeletedDate = GETDATE()

	UPDATE	[CropPoints]
	SET		[IsDeleted] = 1,[UpdatedDate] = @DeletedDate
	WHERE	[Id] = @Id
END
