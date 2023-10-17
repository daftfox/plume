export interface IFormActionComponent {
  key: string;
  action(args?: unknown): void;
}
