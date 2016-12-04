CREATE PROCEDURE [dbo].[Banks_Add]
	@Name NVARCHAR(2048)
AS
BEGIN
	INSERT INTO [Banks]([Name],[CreatedDate],[UpdatedDate]) 
	VALUES(@Name,GETDATE(),GETDATE());
END
