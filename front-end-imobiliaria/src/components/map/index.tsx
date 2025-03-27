"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ latitude = -23.5505, longitude = -46.6333, zoom = 10 }) => {

    const mapContainerRef = useRef(null);
    
    useEffect (() => {
        if(!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container : mapContainerRef.current
        })
    })

}

