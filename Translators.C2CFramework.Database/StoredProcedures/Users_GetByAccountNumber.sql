CREATE PROCEDURE [dbo].[Users_GetByAccountNumber]
	@AccountNumber NVARCHAR(2048)
AS
BEGIN
	SELECT	[Id],
			[Name],
			[Email],
			[Balance],
			[AccountNumber],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted] 
	FROM	[Users]
	WHERE	[AccountNumber] = @AccountNumber AND [IsDeleted] = 0
END


