CREATE PROCEDURE [dbo].[AddActivity]
(
	@UserID					INT,
	@Type					INT,
	@Purpose				INT,
	@Surface				INT,
	@Time					BIGINT,
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

	IF @UserID IS NULL
	BEGIN
		;THROW 50000, 'UserID must be populated.', 0
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

	IF @Time IS NULL
	BEGIN
		;THROW 50000, 'Time must be populated.', 0
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
		
		INSERT INTO [dbo].[Activities]
		(
			[ID],
			[UserID],
			[Type],
			[Purpose],
			[Surface],
			[Time],
			[DistanceInMeters],
			[AverageIntensity],
			[ElevationGain],
			[ElevationLoss],
			[Notes]
		)
		VALUES
		(
			@UserID,
			@Type,
			@Purpose,
			@Surface,
			@Time,
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