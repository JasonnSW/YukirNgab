import React, { useEffect, useState } from "react";
import Button from "./Button/Button";
import { useNavigate, useParams } from "react-router-dom";

const Card = ({ parkir }) => {
  const navigate = useNavigate();
  const [capacity, setCapacity] = useState({ occupiedSlots: 0, totalSlots: 0 });

  useEffect(() => {
    const storedCapacity = localStorage.getItem(
      `parkingCapacity_${parkir.nama}`
    );
    if (storedCapacity) {
      setCapacity(JSON.parse(storedCapacity));
    }
  }, [parkir.nama]);

  const statusColor =
    capacity.occupiedSlots / capacity.totalSlots <= 0.7
      ? "bg-green-500"
      : capacity.occupiedSlots / capacity.totalSlots <= 0.9
      ? "bg-yellow-500"
      : "bg-red-500";

  const handleClick = (nama) => {
    navigate(`/lihat_parkir/${nama}`);
  };

  return (
    <div className="max-w-xl bg-white rounded-lg shadow-md dark:bg-gray-800">
      <img
        className="object-cover w-full h-60"
        src={parkir.foto}
        alt={parkir.nama}
      />

      <div className="p-6">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              Parkir
            </span>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Terisi: {capacity.occupiedSlots}/{capacity.totalSlots}
              </p>
              <div className={`w-4 h-4 rounded-full ${statusColor}`}></div>
            </div>
          </div>
          <a
            href="#"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
          >
            {parkir.nama}
          </a>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {parkir.deskripsi}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-end">
            <Button onClick={() => handleClick(parkir.nama)}>
              Lihat Parkir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
