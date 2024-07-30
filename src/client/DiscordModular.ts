import { ButtonBuilder, ButtonInteraction } from 'discord.js';

export default class DiscordModular extends ButtonBuilder {
	private _onClick: (interaction: ButtonInteraction) => void;

	build(): ButtonBuilder {
		return this;
	}

	onClick(handler: (interaction: ButtonInteraction) => void): this {
		this._onClick = handler;
		return this;
	}
	// onClick(...args: any[]): void {}
}
