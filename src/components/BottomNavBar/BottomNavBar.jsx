import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    AccountCircle,
    Dashboard,
    LibraryMusic,
    LocalActivity,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function BottomNavBar() {
    const [value, setValue] = React.useState("dashboard");

    const handleChange = (event, newValue) => {
        navigate(`/${newValue}`);
        setValue(newValue);
    };
    const navigate = useNavigate();
    return (
        <BottomNavigation
            sx={{ width: 1, position: "sticky", bottom: "0vh", zIndex: 99 }}
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction
                label="Dashboard"
                value="dashboard"
                icon={<Dashboard />}
            />
            <BottomNavigationAction
                label="Library"
                value="library"
                icon={<LibraryMusic />}
            />
            <BottomNavigationAction
                label="Events"
                value="events"
                icon={<LocalActivity />}
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<AccountCircle />}
            />
        </BottomNavigation>
    );
}
