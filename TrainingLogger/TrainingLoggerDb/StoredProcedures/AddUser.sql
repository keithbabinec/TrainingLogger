CREATE PROCEDURE [dbo].[AddUser]
(
	@Username			NVARCHAR(256),
	@HashedPassword		NVARCHAR(2048)
)
AS
BEGIN

	SET ARITHABORT, NOCOUNT, XACT_ABORT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	-- param validation

	IF @Username IS NULL
	BEGIN
		;THROW 50000, 'Username must be populated.', 0
	END

	IF @HashedPassword IS NULL
	BEGIN
		;THROW 50000, 'HashedPassword must be populated.', 0
	END

	-- transaction
	
	BEGIN TRY
		
		BEGIN TRANSACTION
		
		INSERT INTO [dbo].[Users]
		(
			[Username],
			[HashedPassword]
		)
		VALUES
		(
			@Username,
			@HashedPassword
		)

		COMMIT TRANSACTION

	END TRY
	BEGIN CATCH

		IF(@@TRANCOUNT > 0)
		BEGIN
			ROLLBACK TRAN
		END

		;THROW

	END CATCH

	RETURN 0

END