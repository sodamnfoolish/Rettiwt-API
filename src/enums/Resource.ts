/**
 * The different types of resources that can be interacted with.
 *
 * @internal
 */
export enum EResourceType {
	// LIST
	LIST_TWEETS = 'LIST_TWEETS',

	// MEDIA
	MEDIA_UPLOAD_APPEND = 'MEDIA_UPLOAD_APPEND',
	MEDIA_UPLOAD_FINALIZE = 'MEDIA_UPLOAD_FINALIZE',
	MEDIA_UPLOAD_INITIALIZE = 'MEDIA_UPLOAD_INITIALIZE',

	// TWEET
	TWEET_DETAILS = 'TWEET_DETAILS',
	TWEET_LIKE = 'TWEET_LIKE',
	TWEET_LIKERS = 'TWEET_LIKERS',
	TWEET_POST = 'TWEET_POST',
	TWEET_RETWEET = 'TWEET_RETWEET',
	TWEET_RETWEETERS = 'TWEET_RETWEETERS',
	TWEET_SEARCH = 'TWEET_SEARCH',
	TWEET_UNLIKE = 'TWEET_UNLIKE',
	TWEET_UNPOST = 'TWEET_UNPOST',
	TWEET_UNRETWEET = 'TWEET_UNRETWEET',

	// USER
	USER_DETAILS_BY_USERNAME = 'USER_DETAILS_BY_USERNAME',
	USER_DETAILS_BY_ID = 'USER_DETAILS_BY_ID',
	USER_FOLLOW = 'USER_FOLLOW',
	USER_FOLLOWING = 'USER_FOLLOWING',
	USER_FOLLOWERS = 'USER_FOLLOWERS',
	USER_HIGHLIGHTS = 'USER_HIGHLIGHTS',
	USER_LIKES = 'USER_LIKES',
	USER_MEDIA = 'USER_MEDIA',
	USER_SUBSCRIPTIONS = 'USER_SUBSCRIPTIONS',
	USER_TIMELINE = 'USER_TIMELINE',
	USER_TIMELINE_AND_REPLIES = 'USER_TIMELINE_AND_REPLIES',
	USER_UNFOLLOW = 'USER_UNFOLLOW',
}
