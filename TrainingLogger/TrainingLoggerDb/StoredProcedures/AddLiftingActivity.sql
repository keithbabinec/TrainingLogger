CREATE PROCEDURE [dbo].[AddLiftingActivity]
(
	@UserObjectId			UNIQUEIDENTIFIER,
	@Date					DATE,
	@Type					INT,
	@Purpose				INT,
	@FocusArea				INT,
	@Duration				BIGINT,
	@AverageIntensity		INT,
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

	IF @FocusArea IS NULL
	BEGIN
		;THROW 50000, 'FocusArea must be populated.', 0
	END

	IF @Duration IS NULL
	BEGIN
		;THROW 50000, 'Duration must be populated.', 0
	END

	IF @AverageIntensity IS NULL
	BEGIN
		;THROW 50000, 'AverageIntensity must be populated.', 0
	END

	-- transaction
	
	BEGIN TRY
		
		BEGIN TRANSACTION
		
		INSERT INTO [dbo].[LiftingActivities]
		(
			[UserObjectId],
			[Date],
			[Type],
			[Purpose],
			[FocusArea],
			[Duration],
			[AverageIntensity],
			[Notes]
		)
		VALUES
		(
			@UserObjectId,
			@Date,
			@Type,
			@Purpose,
			@FocusArea,
			@Duration,
			@AverageIntensity,
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