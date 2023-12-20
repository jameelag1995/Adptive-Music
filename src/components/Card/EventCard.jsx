import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Info, LocationOnOutlined } from "@mui/icons-material";
import { CiCalendar, CiClock1, CiClock2 } from "react-icons/ci";
import { CalendarIcon } from "@mui/x-date-pickers";
import LocationOn from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventCard({
    img,
    location,
    title,
    date,
    time,
    lineup,
    ticketUrl,
    description,
}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 1, maxWidth: "600px", minHeight: "500px" }}>
            <CardHeader sx={{ textAlign: "center" }} title={title} />
            <CardMedia
                component="img"
                height="200px"
                image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="event cover image"
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "16px",
                }}
            >
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <LocationOn />
                    {location}
                </Typography>

                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <CalendarIcon />
                    {date} - {time}
                </Typography>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <Info />
                    {lineup}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="contained" href={ticketUrl}>
                    Buy Tickets{" "}
                </Button>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography
                        variant="body1"
                        sx={{ width: "100%", textOverflow: "revert" }}
                    >
                        {description}{" "}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
