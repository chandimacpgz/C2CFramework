CREATE PROCEDURE [dbo].[Banks_Get]
AS
BEGIN
	SELECT	[Id],
			[Name],
			[Email],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted] 
	FROM	[Banks]
	WHERE	[IsDeleted] = 0
END
