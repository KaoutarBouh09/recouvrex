import React from 'react';
import EventIcon from '@mui/icons-material/Event';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// Replace 'ProcessIcon' with the actual import if it's a custom icon or correct icon from MUI
import ProcessIcon from "@mui/icons-material/AccountTree";

interface TaskTypeProps {
    type: string;
}

const TaskType = ({ type }: TaskTypeProps) => {
    const renderIcon = () => {
        switch (type) {
            case 'Rendez-vous':
                return <EventIcon fontSize="small" />;
            case 'Appel':
                return <CallIcon  sx={{color:'blue'}} fontSize="small" />;
            case 'Email':
                return <EmailIcon  sx={{color:'green'}} fontSize="small" />;
            case 'Tache':
                return <AssignmentIcon fontSize="small" />;
            case 'Processus':
                return <ProcessIcon sx={{color:'blue'}} fontSize="small" />;
            case 'Visite':
                return <LocationOnIcon  sx={{color:'skyblue'}} fontSize="small" />;
            default:
                return null; // or a default icon
        }
    };

    return (
        <>
           { renderIcon()}
        </>
    );
}

export default TaskType;
