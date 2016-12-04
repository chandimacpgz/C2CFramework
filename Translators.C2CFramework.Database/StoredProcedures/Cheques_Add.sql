CREATE PROCEDURE [dbo].[Cheques_Add]
	@Name NVARCHAR(2048),
	@BankId INT,
	@ArchievedChequeFrontPath VARCHAR(MAX),
	@ArchievedChequeBackPath VARCHAR(MAX),
	@DimensionX INT,
	@DimensionY INT
AS
BEGIN
	INSERT INTO [Cheques] (
		[Name],
		[BankId],
		[ArchievedChequeFrontPath],
		[ArchievedChequeBackPath],
		[DimensionX],
		[DimensionY],
		[CreatedDate],
		[UpdatedDate]) 
	VALUES(
		@Name,
		@BankId,
		@ArchievedChequeFrontPath,
		@ArchievedChequeBackPath,
		@DimensionX,
		@DimensionY,
		GETDATE(),
		GETDATE());
END
