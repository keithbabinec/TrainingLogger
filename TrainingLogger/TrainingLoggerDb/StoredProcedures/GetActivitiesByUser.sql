CREATE PROCEDURE [dbo].[GetActivitiesByUser]
(
	@UserObjectId			UNIQUEIDENTIFIER
)
AS
BEGIN

	SET ARITHABORT, NOCOUNT, XACT_ABORT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	-- param validation

	IF @UserObjectId IS NULL
	BEGIN
		;THROW 50000, 'UserObjectId must be populated.', 0
	END

	-- transaction
	
	BEGIN TRY
		
		BEGIN TRANSACTION
		
		SELECT		[dbo].[Activities].[ID],
					[dbo].[Activities].[UserObjectId],
					[dbo].[Activities].[Date],
					[dbo].[Activities].[Type],
					[dbo].[Activities].[Purpose],
					[dbo].[Activities].[Surface],
					[dbo].[Activities].[Duration],
					[dbo].[Activities].[DistanceInMeters],
					[dbo].[Activities].[AverageIntensity],
					[dbo].[Activities].[ElevationGain],
					[dbo].[Activities].[ElevationLoss],
					[dbo].[Activities].[Notes]
		FROM		[dbo].[Activities]
		WHERE		[dbo].[Activities].[UserObjectId] = @UserObjectId
		ORDER BY	[dbo].[Activities].[Date] DESC

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