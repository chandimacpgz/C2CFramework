CREATE PROCEDURE [dbo].[ATMs_Add]
	@Name NVARCHAR(2048),
	@BankId INT
AS
BEGIN
	INSERT INTO [ATMs] ([Name],[BankId], [CreatedDate],[UpdatedDate]) 
	VALUES(@Name,@BankId,GETDATE(),GETDATE());
END
