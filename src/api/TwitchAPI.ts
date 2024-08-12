import axios from 'axios';
import 'dotenv/config';

export default class TwitchAPI {
	constructor() {}

	async getTwitchAccessToken() {
		const response = await axios.post(
			'https://id.twitch.tv/oauth2/token',
			null,
			{
				params: {
					client_id: process.env.TWITCH_CLIENT_ID,
					client_secret: process.env.TWITCH_CLIENT_SECRET,
					grant_type: 'client_credentials',
				},
			}
		);
		return response.data.access_token;
	}

	async getUser(userName: string): Promise<Streamer | null> {
		const token = await this.getTwitchAccessToken();
		try {
			const response = await axios.get(
				`https://api.twitch.tv/helix/users?login=${userName}`,
				{
					headers: {
						'Client-ID': process.env.TWITCH_CLIENT_ID,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data[0];
		} catch (error) {
			console.log('Error occurred:', error);
			return null;
		}
	}

	async getStreamsById(userIds: string[]): Promise<any[]> {
		const token = await this.getTwitchAccessToken();
		try {
			const response = await axios.get(
				'https://api.twitch.tv/helix/streams?user_id=' +
					userIds.join('&user_id='),
				{
					headers: {
						'Client-ID': process.env.TWITCH_CLIENT_ID,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.log('Error occurred:', error);
			return [];
		}
	}

	async getProfilePicture(userId: string): Promise<string> {
		const token = await this.getTwitchAccessToken();
		try {
			const response = await axios.get(
				`https://api.twitch.tv/helix/users?id=${userId}`,
				{
					headers: {
						'Client-ID': process.env.TWITCH_CLIENT_ID,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data[0].profile_image_url;
		} catch (error) {
			console.log('Error occurred:', error);
			return '';
		}
	}
}

export interface Streamer {
	id: string;
	login: string;
	display_name: string;
	type: string;
	broadcaster_type: string;
	description: string;
	profile_image_url: string;
	offline_image_url: string;
	view_count: number;
	email: string;
	created_at: string;
}
