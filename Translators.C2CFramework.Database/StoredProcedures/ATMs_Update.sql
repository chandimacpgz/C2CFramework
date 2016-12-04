CREATE PROCEDURE [dbo].[ATMs_Update]
	@Id INT,
	@Name NVARCHAR(2048),
	@BankId INT
AS
BEGIN
	DECLARE @UpdatedDate DATETIME

	SELECT	@UpdatedDate = GETDATE()

	UPDATE	[ATMs]
	SET		[Name] = @Name, [BankId] = @BankId, [UpdatedDate] = @UpdatedDate
	WHERE	[Id]=@Id
END