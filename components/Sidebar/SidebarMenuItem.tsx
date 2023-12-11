import React, { FC } from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
    menuItem: {
        "&:hover": {
            backgroundColor: "#D9D9D9",
            color: "#0175B2",
        },
    },
    activeMenuItem: {
        backgroundColor: "#D9D9D9",
        color: "#0175B2",
    },
    icon: {
        marginRight: theme.spacing(2),
    },
}));

interface SubMenuItem {
    label: string;
    path: string;
}

interface SidebarMenuItemProps {
    label: string;
    icon: JSX.Element;
    path?: string;
    submenus?: SubMenuItem[];
    active: boolean;
    onClick: () => void;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
                                                       label,
                                                       icon,
                                                       path,
                                                       submenus,
                                                       active,
                                                       onClick,
                                                   }) => {
    const classes = useStyles();
    const router = useRouter();
    const isOpen = active || router.pathname.startsWith(path || "");
    const hasSubmenus = submenus && submenus.length > 0;

    const handleMenuItemClick = () => {
        if (hasSubmenus) {
            onClick();
        } else if (path) {
            router.push(path);
        }
    };

    return (
        <>
            <ListItem
                button
                onClick={handleMenuItemClick}
                className={`${classes.menuItem} ${active && classes.activeMenuItem}`}
            >
                <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
                {hasSubmenus && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {hasSubmenus && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    {submenus?.map((submenu) => (
                        <SidebarMenuItem
                            key={submenu.label}
                            label={submenu.label}
                            path={submenu.path}
                            active={router.pathname === submenu.path}
                            onClick={() => {}}
                        />
                    ))}
                </Collapse>
            )}
        </>
    );
};

export default SidebarMenuItem;
