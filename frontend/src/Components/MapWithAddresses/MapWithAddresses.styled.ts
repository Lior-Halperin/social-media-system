import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const StyledMapContainer = styled(MapContainer)`
display: flex;
height: 100%;
width: 100%;
border: 2px solid #ccc;
border-radius: 100px;
margin: 10px;
`