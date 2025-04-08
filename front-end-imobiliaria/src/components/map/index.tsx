"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function MapComponent() {

    const mapContainerRef = useRef(null);
    
    useEffect (() => {
        if(!mapContainerRef.current) return;
    })

}

