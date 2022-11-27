import React, { useState, useEffect } from "react";
import "./TEST.css";
import SpotifyWebApi from "spotify-web-api-node"

const TEST = () => {
    const CLIENT_ID = "8bc35a75fa824f0b9ff3d0683c05fa82"
    const REDIRECT_URI = "http://localhost:3000/TEST"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [genreType, setGenreType] = useState()
    const [playlistType, setPlaylistType] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "8bc35a75fa824f0b9ff3d0683c05fa82"
        })

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    // useEffect(() => {

    //     spotifyApi.setAccessToken(token)

    //     console.log(token);

        
    //     spotifyApi.getNewReleases({ limit : 50, country: 'US' })
    //     .then(function(data) {
    //         console.log(data.body)
    //     })
        
    //     spotifyApi.getAlbum('4yP0hdKOZPNshxUOjY0cZj')
    // .then(function(data) {
    //     console.log(data.body.artists[0].name);
    
    // })
        

    // }, [token])

    useEffect(() => {
        spotifyApi.setAccessToken(token);

        if(genreType == "R&B"){
            //are&be playlist on Spotify https://open.spotify.com/playlist/37i9dQZF1DX4SBhb3fqCJd?si=526f64e184434c49
            spotifyApi.getPlaylist("37i9dQZF1DX4SBhb3fqCJd")
            .then(function(data) {
                console.log(data.body);

            })
        }

        if(genreType == "HipHop"){
            //are&be playlist on Spotify https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd?si=a103d0b91f934379
            spotifyApi.getPlaylist("37i9dQZF1DX0XUsuxWHRQd")
            .then(function(data) {
                console.log(data.body.tracks);
                setPlaylistType(
                    data.body.tracks.items.map(track => {
                        return {
                            artists: track.artists[0].name, 
                            title: track.name, 
                            uri: track.uri, 
                            albumUrl: track.album.images[2]

                        }
                    })
                )

            })
        }



    }, [genreType])



    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }









    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
            </header>
            <div>
            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout} >Logout</button>}

                 {token ?
                    <div>
                        <button onClick={() => setGenreType('R&B')}>RnB</button>
                        <button onClick={() => setGenreType('HipHop')}>HipHop</button>
                    </div>

                    : <h2>Please login</h2>
                }
            </div>
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {playlistType.map(track => (
                <PlaylistResult
                    track={track}
                    key={track.uri}
                />
        ))}
                
            </div>
        </div>
    );
};

export default TEST;