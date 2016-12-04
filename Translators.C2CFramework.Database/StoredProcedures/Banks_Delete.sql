CREATE PROCEDURE [dbo].[Banks_Delete]
	@Id INT
AS
BEGIN
	DECLARE @DeletedDate DATETIME

	SELECT	@DeletedDate = GETDATE()

	UPDATE	[Banks]
	SET		[IsDeleted] = 1,[UpdatedDate] = @DeletedDate
	WHERE	[Id] = @Id
END
