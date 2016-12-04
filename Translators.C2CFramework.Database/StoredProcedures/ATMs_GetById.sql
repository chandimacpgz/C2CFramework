CREATE PROCEDURE [dbo].[ATMs_GetById]
	@Id INT
AS
BEGIN
	SELECT	[Id],
			[Name],
			[BankId],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted]  
	FROM	[ATMs]
	WHERE	[Id] = @Id AND [IsDeleted] = 0
END