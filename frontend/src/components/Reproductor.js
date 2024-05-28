import React, { useState, useEffect } from "react";
import axios from "axios";

const Reproductor = ({ apiKey, videoId, onVideoEnd }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
                );
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener detalles del video:", error);
                setError("Error al cargar el video. Por favor, inténtalo de nuevo más tarde.");
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    const handleVideoEnd = () => {
        if (onVideoEnd) {
            onVideoEnd();
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <iframe
                title="Video Player"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}?controls=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
            ></iframe>
        </div>
    );
};


export default Reproductor;