CREATE PROCEDURE [dbo].[Banks_GetById]
	@Id INT
AS
BEGIN
	SELECT	[Id],
			[Name],
			[Email],
			[CreatedDate],
			[UpdatedDate],
			[IsDeleted] 
	FROM	[Banks]
	WHERE	[Id] = @Id AND [IsDeleted] = 0
END
