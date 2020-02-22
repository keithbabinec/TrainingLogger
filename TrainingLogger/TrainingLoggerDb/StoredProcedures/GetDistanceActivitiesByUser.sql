CREATE PROCEDURE [dbo].[GetDistanceActivitiesByUser]
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
		
		SELECT		[dbo].[DistanceActivities].[ID],
					[dbo].[DistanceActivities].[UserObjectId],
					[dbo].[DistanceActivities].[Date],
					[dbo].[DistanceActivities].[Type],
					[dbo].[DistanceActivities].[Purpose],
					[dbo].[DistanceActivities].[Surface],
					[dbo].[DistanceActivities].[Duration],
					[dbo].[DistanceActivities].[DistanceInMeters],
					[dbo].[DistanceActivities].[AverageIntensity],
					[dbo].[DistanceActivities].[ElevationGain],
					[dbo].[DistanceActivities].[ElevationLoss],
					[dbo].[DistanceActivities].[Notes]
		FROM		[dbo].[DistanceActivities]
		WHERE		[dbo].[DistanceActivities].[UserObjectId] = @UserObjectId
		ORDER BY	[dbo].[DistanceActivities].[Date] DESC

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