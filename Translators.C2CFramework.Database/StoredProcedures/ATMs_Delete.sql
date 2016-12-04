CREATE PROCEDURE [dbo].[ATMs_Delete]
	@Id INT
AS
BEGIN
	DECLARE @DeletedDate DATETIME

	SELECT	@DeletedDate = GETDATE()

	UPDATE	[ATMs]
	SET		[IsDeleted] = 1,[UpdatedDate] = @DeletedDate
	WHERE	[Id] = @Id
END
