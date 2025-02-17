import React from "react";

// utils
import classnames from "classnames";
import objectsToString from "../../utils/objectsToString";

// context
import { useTheme } from "../../context/theme";

// types
import type { className, disabled, children } from "../../types/components/menu";
import {
  propTypesClassName,
  propTypesDisabled,
  propTypesChildren,
} from "../../types/components/menu";

export interface MenuItemProps extends React.ComponentProps<"li"> {
  className?: className;
  disabled?: disabled;
  children: children;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  ({ className, disabled, children, ...rest }, ref) => {
    // 1. init
    const { menu } = useTheme();
    const {
      styles: { base },
    } = menu;

    // 2. set default props
    className = className ?? "";
    disabled = disabled ?? false;

    // 3. set styles
    const menuItemClasses = classnames(
      objectsToString(base.item.initial),
      { [objectsToString(base.item.disabled)]: disabled },
      className,
    );

    // 4. return
    return (
      <li {...rest} ref={ref} role="menuitem" className={menuItemClasses}>
        {children}
      </li>
    );
  },
);

MenuItem.propTypes = {
  className: propTypesClassName,
  disabled: propTypesDisabled,
  children: propTypesChildren,
};

MenuItem.displayName = "MaterialTailwind.MenuItem";

export default MenuItem;
