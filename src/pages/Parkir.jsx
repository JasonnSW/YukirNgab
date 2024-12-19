import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import useAuth from "../hooks/useAuth";
import Data from "../Data/peta.json";
import Navbar from "../Components/Navbar";

const Parkir = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-slate-200">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
          {Data.map((parkir) => (
            <Card key={parkir.id} parkir={parkir} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Parkir;
