CREATE PROCEDURE [dbo].[SelectUser]
(
	@Username			NVARCHAR(256)
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

	-- transaction
	
	SELECT	[dbo].[Users].[ID],
			[dbo].[Users].[Username],
			[dbo].[Users].[HashedPassword]
	FROM	[dbo].[Users]
	WHERE	[dbo].[Users].[Username] = @Username

	RETURN 0

END