// PACKAGES
import {
	ITweet as IRawTweet,
	IEntities as IRawTweetEntities,
	IExtendedMedia as IRawExtendedMedia,
	EMediaType,
} from 'rettiwt-core';

// TYPES
import { ITweet, ITweetEntities } from '../../types/public/Tweet';

// MODELS
import { User } from './User';

// PARSERS
import { normalizeText } from '../../helper/JsonUtils';

/**
 * The details of a single Tweet.
 *
 * @public
 */
export class Tweet implements ITweet {
	public id: string;
	public tweetBy: User;
	public createdAt: string;
	public entities: TweetEntities;
	public media: TweetMedia[];
	public quoted: string;
	public fullText: string;
	public replyTo: string;
	public lang: string;
	public quoteCount: number;
	public replyCount: number;
	public retweetCount: number;
	public likeCount: number;
	public viewCount: number;
	public bookmarkCount: number;

	/**
	 * Initializes a new Tweet from the given raw tweet data.
	 *
	 * @param tweet - The raw tweet data.
	 */
	public constructor(tweet: IRawTweet) {
		this.id = tweet.rest_id;
		this.createdAt = tweet.legacy.created_at;
		this.tweetBy = new User(tweet.core.user_results.result);
		this.entities = new TweetEntities(tweet.legacy.entities);
		this.media = tweet.legacy.extended_entities?.media?.map((media) => new TweetMedia(media));
		this.quoted = tweet.legacy.quoted_status_id_str;
		this.fullText = normalizeText(tweet.legacy.full_text);
		this.replyTo = tweet.legacy.in_reply_to_status_id_str;
		this.lang = tweet.legacy.lang;
		this.quoteCount = tweet.legacy.quote_count;
		this.replyCount = tweet.legacy.reply_count;
		this.retweetCount = tweet.legacy.retweet_count;
		this.likeCount = tweet.legacy.favorite_count;
		this.viewCount = parseInt(tweet.views.count);
		this.bookmarkCount = tweet.legacy.bookmark_count;
	}
}

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 *
 * @public
 */
export class TweetEntities implements ITweetEntities {
	public hashtags: string[] = [];
	public urls: string[] = [];
	public mentionedUsers: string[] = [];

	/**
	 * Initializes the TweetEntities from the raw tweet entities.
	 *
	 * @param entities - The raw tweet entities.
	 */
	public constructor(entities: IRawTweetEntities) {
		// Extracting user mentions
		if (entities.user_mentions) {
			for (const user of entities.user_mentions) {
				this.mentionedUsers.push(user.screen_name);
			}
		}

		// Extracting urls
		if (entities.urls) {
			for (const url of entities.urls) {
				this.urls.push(url.expanded_url);
			}
		}

		// Extracting hashtags
		if (entities.hashtags) {
			for (const hashtag of entities.hashtags) {
				this.hashtags.push(hashtag.text);
			}
		}
	}
}

/**
 * A single media content.
 *
 * @public
 */
export class TweetMedia {
	public type: EMediaType;
	public url: string = '';

	/**
	 * Initializes the TweetMedia from the raw tweet media.
	 *
	 * @param media - The raw tweet media.
	 */
	public constructor(media: IRawExtendedMedia) {
		this.type = media.type;

		// If the media is a photo
		if (media.type == EMediaType.PHOTO) {
			this.url = media.media_url_https;
		}
		// If the media is a gif
		else if (media.type == EMediaType.GIF) {
			this.url = media.video_info?.variants[0].url as string;
		}
		// If the media is a video
		else {
			/** The highest bitrate of all variants. */
			let highestRate: number = 0;

			/**
			 * Selecting the URL of the video variant with the highest bitrate.
			 */
			media.video_info?.variants.forEach((variant) => {
				if (variant.bitrate > highestRate) {
					highestRate = variant.bitrate;
					this.url = variant.url;
				}
			});
		}
	}
}