/**
 * The data returned from extractor methods.
 *
 * @internal
 */
export interface IDataExtract<T> {
	/** The required data. */
	required: T[];

	/** The cursor string to the next batch of data. */
	cursor: string;
}
