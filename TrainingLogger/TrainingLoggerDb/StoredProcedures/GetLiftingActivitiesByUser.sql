CREATE PROCEDURE [dbo].[GetLiftingActivitiesByUser]
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
		
		SELECT		[dbo].[LiftingActivities].[ID],
					[dbo].[LiftingActivities].[UserObjectId],
					[dbo].[LiftingActivities].[Date],
					[dbo].[LiftingActivities].[Type],
					[dbo].[LiftingActivities].[Purpose],
					[dbo].[LiftingActivities].[FocusArea],
					[dbo].[LiftingActivities].[Duration],
					[dbo].[LiftingActivities].[AverageIntensity],
					[dbo].[LiftingActivities].[Notes]
		FROM		[dbo].[LiftingActivities]
		WHERE		[dbo].[LiftingActivities].[UserObjectId] = @UserObjectId
		ORDER BY	[dbo].[LiftingActivities].[Date] DESC

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