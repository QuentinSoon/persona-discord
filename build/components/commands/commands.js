export class SlashCommandComponent {
    constructor(command) {
        this.data = command;
    }
    execute(client, interaction, ...args) { }
}
