CREATE PROCEDURE [dbo].[AddDistanceActivity]
(
	@UserObjectId			UNIQUEIDENTIFIER,
	@Date					DATE,
	@Type					INT,
	@Purpose				INT,
	@Surface				INT,
	@Duration				BIGINT,
	@DistanceInMeters		INT,
	@AverageIntensity		INT,
	@ElevationGain			INT,
	@ElevationLoss			INT,
	@Notes					NVARCHAR(MAX)
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

	IF @Date IS NULL
	BEGIN
		;THROW 50000, 'Date must be populated.', 0
	END

	IF @Type IS NULL
	BEGIN
		;THROW 50000, 'Type must be populated.', 0
	END

	IF @Purpose IS NULL
	BEGIN
		;THROW 50000, 'Purpose must be populated.', 0
	END

	IF @Surface IS NULL
	BEGIN
		;THROW 50000, 'Surface must be populated.', 0
	END

	IF @Duration IS NULL
	BEGIN
		;THROW 50000, 'Duration must be populated.', 0
	END

	IF @DistanceInMeters IS NULL
	BEGIN
		;THROW 50000, 'DistanceInMeters must be populated.', 0
	END

	IF @AverageIntensity IS NULL
	BEGIN
		;THROW 50000, 'AverageIntensity must be populated.', 0
	END

	IF @ElevationGain IS NULL
	BEGIN
		;THROW 50000, 'ElevationGain must be populated.', 0
	END

	IF @ElevationLoss IS NULL
	BEGIN
		;THROW 50000, 'ElevationLoss must be populated.', 0
	END

	-- transaction
	
	BEGIN TRY
		
		BEGIN TRANSACTION
		
		INSERT INTO [dbo].[DistanceActivities]
		(
			[UserObjectId],
			[Date],
			[Type],
			[Purpose],
			[Surface],
			[Duration],
			[DistanceInMeters],
			[AverageIntensity],
			[ElevationGain],
			[ElevationLoss],
			[Notes]
		)
		VALUES
		(
			@UserObjectId,
			@Date,
			@Type,
			@Purpose,
			@Surface,
			@Duration,
			@DistanceInMeters,
			@AverageIntensity,
			@ElevationGain,
			@ElevationLoss,
			@Notes
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