CREATE PROCEDURE [dbo].[LiveChequePaths_Delete]
	@Id INT
AS
BEGIN
	DECLARE @DeletedDate DATETIME

	SELECT	@DeletedDate = GETDATE()

	UPDATE	[LiveChequePaths]
	SET		[IsDeleted] = 1,[UpdatedDate] = @DeletedDate
	WHERE	[Id] = @Id
END
