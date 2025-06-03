import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Dashbboard: React.FC = () => {
    const location = useLocation(); 
    return (
        <Typography variant="h5" gutterBottom>Hello {location.state?.user?.name}</Typography>
    );
}

export default Dashbboard;