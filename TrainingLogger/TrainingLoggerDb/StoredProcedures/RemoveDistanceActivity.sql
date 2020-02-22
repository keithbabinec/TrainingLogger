CREATE PROCEDURE [dbo].[RemoveDistanceActivity]
(
	@UserId					UNIQUEIDENTIFIER,
	@ActivityId				BIGINT
)
AS
BEGIN

	SET ARITHABORT, NOCOUNT, XACT_ABORT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

	-- param validation

	IF @UserId IS NULL
	BEGIN
		;THROW 50000, 'UserId must be populated.', 0
	END

	IF @ActivityId IS NULL
	BEGIN
		;THROW 50000, 'ActivityId must be populated.', 0
	END

	-- transaction
	
	BEGIN TRY
		
		BEGIN TRANSACTION
		
		DECLARE @MatchedRecordUserId UNIQUEIDENTIFIER
		
		SELECT	TOP 1 @MatchedRecordUserId = [dbo].[DistanceActivities].[UserObjectId]
		FROM	[dbo].[DistanceActivities]
		WHERE	[dbo].[DistanceActivities].[ID] = @ActivityId

		IF @MatchedRecordUserId IS NOT NULL
		BEGIN
			IF @MatchedRecordUserId = @UserId
			BEGIN
				DELETE FROM		[dbo].[DistanceActivities]
				WHERE			[dbo].[DistanceActivities].[ID] = @ActivityId
			END
			ELSE
			BEGIN
				;THROW 50000, 'Not authorized -- user ID does not match.', 0
			END
		END
		
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