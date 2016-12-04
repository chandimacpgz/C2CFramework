CREATE PROCEDURE [dbo].[Cheques_Delete]
	@Id INT
AS
BEGIN
	DECLARE @DeletedDate DATETIME

	SELECT	@DeletedDate = GETDATE()

	UPDATE	[Cheques]
	SET		[IsDeleted] = 1,[UpdatedDate] = @DeletedDate
	WHERE	[Id] = @Id
END
