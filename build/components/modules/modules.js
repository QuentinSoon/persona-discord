var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Events } from 'discord.js';
export default class ModuleComponent {
    constructor(client, name) {
        this._client = client;
        this._name = name;
        this._client.on(Events.InteractionCreate, (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (interaction.isButton()) {
                if (!interaction.customId.startsWith(this._name))
                    return;
                yield this.execute(interaction.customId, client, interaction);
            }
            if (interaction.isChatInputCommand()) {
                const command = client.collection.application_commands.get(interaction.commandName);
                if (!command)
                    return;
                if (!command.data.modules)
                    return;
                if (!command.data.modules.includes(this._name))
                    return;
                this.execute(command.data.modules, client, interaction);
            }
            if (interaction.isModalSubmit()) {
                if (!interaction.customId.startsWith(this._name))
                    return;
                this.execute(interaction.customId, client, interaction);
            }
            if (interaction.isChannelSelectMenu()) {
                if (!interaction.customId.startsWith(this._name))
                    return;
                this.execute(interaction.customId, client, interaction);
            }
        }));
    }
    execute(customId, client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [, action, data, ...rest] = customId.split(':');
                if (typeof this[action] !== 'function') {
                    if (interaction.isButton() || interaction.isChatInputCommand()) {
                        yield interaction.reply({
                            content: 'Error: Interaction type does not match.',
                            ephemeral: true,
                        });
                    }
                    return console.log(`Function ${action} does not exist in PanelModule.`);
                }
                const actionMethod = this[action];
                try {
                    yield actionMethod.call(this, client, interaction, data, ...rest);
                }
                catch (err) {
                    console.log(`Function ${action} called in PanelModule but interaction type does not match.`);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
