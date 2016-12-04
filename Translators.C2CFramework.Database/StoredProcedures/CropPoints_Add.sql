CREATE PROCEDURE [dbo].[CropPoints_Add]
	@CropType NVARCHAR(256),
	@BankId INT,
	@ChequeId INT,
	@CropStartX INT,
	@CropStartY INT,
	@CropWidth INT,
	@CropHeight INT
AS
BEGIN
	INSERT INTO [CropPoints] ([CropType] ,[BankId],[ChequeId],[CropStartX],[CropStartY],[CropWidth],[CropHeight], [CreatedDate],[UpdatedDate]) 
	VALUES(@CropType,@BankId,@ChequeId,@CropStartX,@CropStartY,@CropWidth,@CropHeight,GETDATE(),GETDATE());
END
