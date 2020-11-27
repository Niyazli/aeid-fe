export interface IMenuItem {
  label: string;
  description: string;
  action: IAction;
  link: string;
}

interface IAction {
  label: string;
  action: string;
}
