"use client"

import { useParams } from "next/navigation";
import EditProfile from "../EditProfile";

export default function PropertyPage() {
  
  const params = useParams();
  
  const id = params.id ?? 0;



  return (
    <EditProfile marketId={Number(id)}/>
    );

}