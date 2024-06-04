export interface IClient {
	Init(): void;
	RegisterGuild(): void;
	RegisterEvents(): void;
	RegisterCommands(): void;
}
