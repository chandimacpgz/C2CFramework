CREATE PROCEDURE [dbo].[ATMs_Get]
AS
BEGIN
	SELECT	[Id],
			[Name],
			[BankId],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted]  
	FROM	[ATMs]
	WHERE	[IsDeleted] = 0
END
