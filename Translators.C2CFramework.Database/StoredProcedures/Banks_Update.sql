CREATE PROCEDURE [dbo].[Banks_Update]
	@Id INT,
	@Name NVARCHAR(2048),
	@Email NVARCHAR(2048)
AS
BEGIN
	DECLARE @UpdatedDate DATETIME

	SELECT	@UpdatedDate = GETDATE()

	UPDATE	[Banks]
	SET		[Name] = @Name, [Email] = @Email, [UpdatedDate] = @UpdatedDate
	WHERE	[Id]=@Id
END