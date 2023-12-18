import {
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    InputBase,
    Paper,
    useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { deepPurple, grey, orange } from "@mui/material/colors";
import BasicCard from "../../components/Card/BasicCard";
import SearchCategory from "./SearchCategory";
import Equalizer from "../../components/Equalizer/Equalizer";

export default function Search({ accessToken, setIsSearching }) {
    const { palette } = useTheme();
    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    console.log(accessToken);
    const handleCategoryClick = (e, category) => {
        search(e, category);
    };
    async function search(e, category = "track") {
        console.log("searching for ", searchInput);
        if (searchInput === "") {
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        // get request using search to get the artist id
        const searchParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        console.log(category);
        let searchUrl =
            "https://api.spotify.com/v1/search?q=" +
            searchInput +
            "&type=" +
            category;
        setTimeout(async () => {
            const searchResult = await fetch(searchUrl, searchParams)
                .then((response) => response.json())
                .then((searchData) => {
                    const newData = Object.values(searchData)[0].items;
                    console.log(Object.values(searchData)[0].items);
                    setData(newData);
                    return searchData;
                });
        }, 600);
        // console.log("artist id is :", artistId);
        // get request with artist id grab all albums from that artist
        // const albums = await fetch(
        //     `https://api.spotify.com/v1/albums/${artistId}?market=US`,
        //     searchParams
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         setData(data)});
        // display those albums to the user
    }

    return (
        <div className="Search">
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 1,
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Music"
                    inputProps={{ "aria-label": "search google maps" }}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        search(e);
                    }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={(e) => search(e)}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={(e) => handleCategoryClick(e, "track")}>
                    Tracks
                </Button>
                <Button onClick={(e) => handleCategoryClick(e, "artist")}>
                    Artists
                </Button>
                <Button onClick={(e) => handleCategoryClick(e, "album")}>
                    Albums
                </Button>
                <Button onClick={(e) => handleCategoryClick(e, "playlist")}>
                    Playlists
                </Button>
            </ButtonGroup>
            <div className="cards-container">
                {data?.map((element) => {
                    if (element.type === "track") {
                        return (
                            <BasicCard
                                key={element.id}
                                cover={element?.album.images[1]?.url}
                                artist={element?.artists[0].name}
                                title={element?.name}
                                type={element?.type}
                                elementUrl={element?.uri}
                            />
                        );
                    }
                    if (element.type === "album") {
                        return (
                            <BasicCard
                                key={element.id}
                                cover={element?.images[1]?.url}
                                artist={element?.artists[0].name}
                                title={element?.name}
                                type={element?.type}
                                elementUrl={element?.uri}
                            />
                        );
                    }
                    if (element.type === "playlist") {
                        return (
                            <BasicCard
                                key={element.id}
                                cover={element?.images[0]?.url}
                                artist={element?.owner.display_name}
                                title={element?.name}
                                type={element?.type}
                                elementUrl={element?.uri}
                            />
                        );
                    }
                    if (element.type === "artist") {
                        return (
                            <BasicCard
                                key={element.id}
                                cover={element?.images[1]?.url}
                                artist={""}
                                title={element?.name}
                                type={element?.type}
                                elementUrl={element?.uri}
                            />
                        );
                    }
                })}
            </div>
            {/* <Equalizer loading={loading} /> */}
        </div>
    );
}
