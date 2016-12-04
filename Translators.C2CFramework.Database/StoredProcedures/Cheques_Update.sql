CREATE PROCEDURE [dbo].[Cheques_Update]
	@Id INT,
	@Name NVARCHAR(2048),
	@BankId INT,
	@ArchievedChequeFrontPath VARCHAR(MAX),
	@ArchievedChequeBackPath VARCHAR(MAX),
	@DimensionX INT,
	@DimensionY INT
AS
BEGIN
	DECLARE @UpdatedDate DATETIME

	SELECT	@UpdatedDate = GETDATE()

	UPDATE	[Cheques]
	SET		[Name] = @Name, 
			[BankId] = @BankId,
			[ArchievedChequeFrontPath]=@ArchievedChequeFrontPath,
			[ArchievedChequeBackPath]=@ArchievedChequeBackPath, 
			[DimensionX] = @DimensionX,
			[DimensionY] = @DimensionY,
			[UpdatedDate] = @UpdatedDate
	WHERE	[Id]=@Id
END