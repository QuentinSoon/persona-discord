import { ButtonBuilder, ButtonInteraction } from 'discord.js';

export const buttons = new Map();

export default class DiscordModular extends ButtonBuilder {
	private _onClick: (interaction: ButtonInteraction) => void;
	private _customId: string = '';

	constructor() {
		super();
	}

	build(): ButtonBuilder {
		buttons.set(this._customId, this);
		return this;
	}

	setId(customId: string): this {
		this.customId = customId;
		this.setCustomId(customId);
		return this;
	}

	onClick(handler: (interaction: ButtonInteraction) => void): this {
		this._onClick = handler;
		return this;
	}

	handleInteraction(interaction: ButtonInteraction) {
		if (this._onClick) {
			this._onClick(interaction);
		}
	}

	get customId(): string {
		return this._customId;
	}

	set customId(customId: string) {
		this._customId = customId;
	}
}
