import { routeNamePosMgmt } from "./route-name";

const makeItem = (title: string, path?: string) => ({
  title,
  ...(path && { path }),
  disabled: false,
});

const withLastItemNonNavigable = (
  items: { title: string; path?: string; disabled?: boolean }[]
): { title: string; path?: string; disabled?: boolean }[] => {
  if (!items.length) return [];

  return items.map((item, index) => {
    if (index === items.length - 1) {
      const { title } = item;
      // Return only the title for the last item, no path and mark as disabled
      return { title, disabled: true };
    }
    return item;
  });
};

// Breadcrumb base definitions
const merchantBase = withLastItemNonNavigable([
  makeItem("Merchant", routeNamePosMgmt.setting_merchant),
  makeItem("List", routeNamePosMgmt.setting_merchant),
]);

const terminalBase = withLastItemNonNavigable([
  makeItem("Terminal", routeNamePosMgmt.setting_pos_terminal),
  makeItem("List", routeNamePosMgmt.setting_pos_terminal),
]);

const posMachineBase = withLastItemNonNavigable([
  makeItem("POS Machine", routeNamePosMgmt.setting_pos_machine),
  makeItem("List", routeNamePosMgmt.setting_pos_machine),
]);

const usersBase = withLastItemNonNavigable([
  makeItem("Users", routeNamePosMgmt.users),
  makeItem("List", routeNamePosMgmt.users),
]);

const rolePermissionBase = withLastItemNonNavigable([
  makeItem("Role and Permission", routeNamePosMgmt.role_permission),
  makeItem("List", routeNamePosMgmt.role_permission),
]);

export const posMgmtBreadcrumbs = {
  setting_merchant: merchantBase,

  setting_merchant_detail: withLastItemNonNavigable([
    makeItem("Merchant", routeNamePosMgmt.setting_merchant),
    makeItem("Merchant Detail"),
  ]),

  setting_pos_terminal: terminalBase,

  setting_pos_machine: posMachineBase,

  users: usersBase,

  role_permission: rolePermissionBase,

  role_permission_create: withLastItemNonNavigable([
    ...rolePermissionBase.slice(0, -1), // Use only navigable items from the base
    makeItem("Create", routeNamePosMgmt.role_permission_create),
  ]),

  role_permission_update: withLastItemNonNavigable([
    ...rolePermissionBase.slice(0, -1), // Use only navigable items from the base
    makeItem("Update", routeNamePosMgmt.role_permission_update),
  ]),
};