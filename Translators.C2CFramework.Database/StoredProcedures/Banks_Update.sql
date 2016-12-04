CREATE PROCEDURE [dbo].[Banks_Update]
	@Id INT,
	@Name NVARCHAR(2048)
AS
BEGIN
	DECLARE @UpdatedDate DATETIME

	SELECT	@UpdatedDate = GETDATE()

	UPDATE	[Banks]
	SET		[Name] = @Name, [UpdatedDate] = @UpdatedDate
	WHERE	[Id]=@Id
END