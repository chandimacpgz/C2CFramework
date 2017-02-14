CREATE PROCEDURE [dbo].[Banks_Add]
	@Name NVARCHAR(2048),
	@Email NVARCHAR(2048)
AS
BEGIN
	INSERT INTO [Banks]([Name],[Email],[CreatedDate],[UpdatedDate]) 
	VALUES(@Name,@Email,GETDATE(),GETDATE());
END
