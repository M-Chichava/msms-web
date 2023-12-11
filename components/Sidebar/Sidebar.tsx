import React, { FC, useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
    Box,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
    DashboardOutlined,
    Payment,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import Link from "next/link";

interface SubMenuItem {
    label: string;
    path: string;
}

interface MenuItemProps {
    label: string;
    icon: JSX.Element;
    path?: string;
    submenus?: SubMenuItem[];
}

interface SidebarProps {
    isAdmin: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ label, icon, path, submenus }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isActive = (menuPath) => {
        // Check if the current route matches the menu path
        return router.pathname === menuPath;
    };

    const handleClick = () => {
        if (submenus && submenus.length > 0) {
            setOpen(!open);
        } else if (path) {
            router.push(path);
        }
    };

    return (
        <>
            <ListItem
                button
                onClick={handleClick}
                style={{
                    backgroundColor: isActive(path) ? "#475569" : "inherit",
                    height: isActive(path) ? '40px' : "inherit",
                    color: isActive(path) ? "#ebebeb" : "inherit",
                    borderBottom: isActive(path) ? "1px solid #2bcbea" : "none",
                }}
            >
                <ListItemIcon style={{
                    color: isActive(path) ? "#ebebeb" : "inherit",
                }}>{icon}</ListItemIcon>
                <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                        style: { fontFamily: "inherit", fontSize: "inherit" },
                    }}
                />
                {submenus && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {submenus && (
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        {submenus.map((submenu) => (
                            <ListItem
                                key={submenu.label}
                                button
                                onClick={() => router.push(submenu.path)}
                                style={{
                                    backgroundColor: isActive(submenu.path)
                                        ? "#475569"
                                        : "inherit",
                                    borderRadius:'2px',
                                    height: isActive(submenu.path) ? '40px' : "inherit",
                                    color: isActive(submenu.path) ? "#ebebeb" : "inherit",
                                    borderBottom: isActive(submenu.path) ? "1px solid #2bcbea" : "none",
                                }}
                            >
                                <ListItemIcon />
                                <ListItemText
                                    primary={submenu.label}
                                    primaryTypographyProps={{
                                        style: { fontFamily: "inherit", fontSize: "14px" },
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

const Sidebar: FC<SidebarProps> = ({ isAdmin }) => {
    return (
        <Drawer variant="permanent">
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-sm bg-blueGray-700 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full text-blueGray-200 md:flex-nowrap px-0 flex flex-wrap items-center w-full mx-auto">
                    <Box className="flex flex-col gap-6">
                        <Link href="#!" legacyBehavior>
                            <Typography>Finanças em Dia</Typography>
                        </Link>
                        <Divider />
                    </Box>
                    <List>
                        <MenuItem
                            label="Painel"
                            icon={<DashboardOutlined />}
                            path="/microcredit"
                        />
                        <MenuItem
                            label="Emprestimos"
                            icon={<AccountBalanceWalletOutlinedIcon />}
                            submenus={[
                                { label: "Listar Emprestimos", path: "/microcredit/loans" },
                                { label: "Criar Emprestimo", path: "/microcredit/loans/add" },
                            ]}
                        />
                        <MenuItem
                            label="Clientes"
                            icon={<PeopleOutlineOutlinedIcon />}
                            submenus={[
                                { label: "Listar Clientes", path: "/microcredit/customers" },
                                { label: "Criar Cliente", path: "/microcredit/customers/add" },
                            ]}
                        />
                        <MenuItem
                            label="Pagamentos"
                            icon={<PaymentOutlinedIcon />}
                            submenus={[
                                { label: "Listar Pagamentos", path: "/microcredit/payments" },
                                { label: "Criar Pagamento", path: "/microcredit/payments/add" },
                            ]}
                        />
                        {isAdmin && (
                            <>
                                {/* Render additional menu items for admin */}
                                <MenuItem
                                    label="Contractos"
                                    icon={<ReceiptOutlinedIcon />}
                                    path="/microcredit/contractos"
                                />
                                <MenuItem
                                    label="Relatorios"
                                    icon={<AssignmentOutlinedIcon />}
                                    path="/microcredit/relatorios"
                                />
                                <MenuItem
                                    label="Auditoria de Accoes"
                                    icon={<ScreenSearchDesktopOutlinedIcon />}
                                    path="/microcredit/auditoria"
                                />
                                <MenuItem
                                    label="Configuracoes"
                                    icon={<SettingsOutlinedIcon />}
                                    path="/microcredit/configuracoes"
                                />
                            </>
                        )}
                    </List>
                </div>
            </nav>
        </Drawer>
    );
};

export default Sidebar;
