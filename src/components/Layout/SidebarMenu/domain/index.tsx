export interface ISideBarMenu {
  path_name: string;
  title_name: string;
  icon_name: React.ReactNode | string;
  sub_menu: boolean;
  children: ISubSidebarMenu[];
  role: string;
}

export interface ISubSidebarMenu {
  sub_path_name: string;
  permissions: string[];
  sub_title_name: string;
}
