import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../Components/Navbar";

const Slot = () => {
  const { nama } = useParams();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const loadSlotsFromLocalStorage = (nama) => {
    const storedSlots = localStorage.getItem(`parkingSlots_${nama}`);
    if (storedSlots) {
      return JSON.parse(storedSlots);
    } else {
      const initialSlots = Array(10)
        .fill(null)
        .map(() =>
          Array(10)
            .fill(null)
            .map(() => ({
              status: Math.random() > 0.5 ? 0 : 1,
              vehicle: null,
            }))
        );
      return initialSlots;
    }
  };

  const [slots, setSlots] = useState(loadSlotsFromLocalStorage(nama));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [error, setError] = useState("");
  const [isVehicleAssigned, setIsVehicleAssigned] = useState(false);
  const [isVehicleSelected, setIsVehicleSelected] = useState(false);

  useEffect(() => {
    const savedVehicleStatus = localStorage.getItem(`vehicleAssigned_${nama}`);
    if (savedVehicleStatus === "true") {
      setIsVehicleSelected(true);
    }
  }, [nama]);

  useEffect(() => {
    localStorage.setItem(`parkingSlots_${nama}`, JSON.stringify(slots));
  }, [slots, nama]);

  const handleSlotClick = (rowIndex, colIndex) => {
    const selected = slots[rowIndex][colIndex];
    if (selected.status === 0 && !isVehicleSelected) {
      setSelectedSlot({ row: rowIndex, col: colIndex });
      setError("");
    } else if (selected.status === 1 && !isVehicleSelected) {
      setSelectedSlot({ row: rowIndex, col: colIndex });
      setError("");
    } else {
      setError("Anda sudah memilih kendaraan parkir.");
    }
  };

  const isVehicleNumberUnique = (number) => {
    for (let row of slots) {
      for (let slot of row) {
        if (slot.vehicle === number) {
          return false;
        }
      }
    }
    return true;
  };

  const handleConfirm = () => {
    if (!vehicleNumber.trim()) {
      setError("Silakan masukkan nomor kendaraan Anda.");
      return;
    }

    if (!isVehicleNumberUnique(vehicleNumber)) {
      alert("Nomor kendaraan ini sudah terdaftar di slot parkir!");
      return;
    }

    if (selectedSlot && !isVehicleSelected) {
      const newSlots = [...slots];
      newSlots[selectedSlot.row][selectedSlot.col] = {
        status: 1,
        vehicle: vehicleNumber,
      };
      setSlots(newSlots);
      setIsVehicleAssigned(true);
      setIsVehicleSelected(true);
      localStorage.setItem(`vehicleAssigned_${nama}`, "true");
      localStorage.setItem(
        `selectedSlot_${nama}`,
        JSON.stringify(selectedSlot)
      );
      setSelectedSlot(null);
      setVehicleNumber("");
      const history = JSON.parse(localStorage.getItem("parkingHistory")) || [];
      history.push({
        vehicle: vehicleNumber,
        action: "Masuk",
        slot: `Baris ${selectedSlot.row + 1}, Kolom ${selectedSlot.col + 1}`,
        timestamp: new Date().toLocaleString(),
        namaGedung: nama,
      });
      localStorage.setItem("parkingHistory", JSON.stringify(history));
      alert(`Kendaraan berhasil diparkir pada ${new Date().toLocaleString()}.`);
    }
  };

  const handleExit = () => {
    const savedSlot =
      selectedSlot || JSON.parse(localStorage.getItem(`selectedSlot_${nama}`));
    if (isVehicleSelected && savedSlot) {
      const vehicle = slots[savedSlot.row][savedSlot.col].vehicle;
      const newSlots = [...slots];
      newSlots[savedSlot.row][savedSlot.col] = {
        status: 0,
        vehicle: null,
      };
      setSlots(newSlots);
      setSelectedSlot(null);
      setVehicleNumber("");
      setError("");
      setIsVehicleAssigned(false);
      setIsVehicleSelected(false);
      localStorage.removeItem(`vehicleAssigned_${nama}`);
      localStorage.removeItem(`selectedSlot_${nama}`);
      const history = JSON.parse(localStorage.getItem("parkingHistory")) || [];
      history.push({
        vehicle: vehicle,
        action: "Keluar",
        slot: `Baris ${savedSlot.row + 1}, Kolom ${savedSlot.col + 1}`,
        timestamp: new Date().toLocaleString(),
        namaGedung: nama,
      });
      localStorage.setItem("parkingHistory", JSON.stringify(history));

      alert(`Kendaraan berhasil keluar pada ${new Date().toLocaleString()}.`);
    } else {
      setError("Tidak ada kendaraan yang dipilih.");
    }
  };

  const getSlotColor = (slot, rowIndex, colIndex) => {
    if (selectedSlot?.row === rowIndex && selectedSlot?.col === colIndex) {
      return "bg-blue-500";
    }
    return slot.status === 1 ? "bg-red-500" : "bg-green-500";
  };

  const countOccupiedSlots = () => {
    return slots.reduce(
      (count, row) =>
        count +
        row.reduce(
          (rowCount, slot) => rowCount + (slot.status === 1 ? 1 : 0),
          0
        ),
      0
    );
  };

  const totalSlots = slots.length * slots[0].length;
  const occupiedSlots = countOccupiedSlots();

  useEffect(() => {
    const occupiedSlots = countOccupiedSlots();
    const totalSlots = slots.length * slots[0].length;
    localStorage.setItem(
      `parkingCapacity_${nama}`,
      JSON.stringify({ occupiedSlots, totalSlots })
    );
  }, [slots, nama]);

  return (
    <>
      <Navbar />
      <div className="pt-12 bg-slate-200 pb-12">
        <h1 className="text-2xl font-bold text-center mb-4">
          Pilih Slot Parkir di {nama}
        </h1>
        <div className="text-center mb-4">
          <p className="text-xl font-semibold">
            Kapasitas Parkir: {occupiedSlots}/{totalSlots}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {slots.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((slot, colIndex) => (
                <button
                  key={colIndex}
                  onClick={() => handleSlotClick(rowIndex, colIndex)}
                  disabled={slot.status === 1 || isVehicleSelected}
                  className={`w-12 h-12 flex items-center justify-center rounded ${getSlotColor(
                    slot,
                    rowIndex,
                    colIndex
                  )} cursor-pointer`}
                >
                  {slot.status === 1 ? "X" : "O"}
                </button>
              ))}
            </div>
          ))}
        </div>

        {selectedSlot && !isVehicleSelected && (
          <div className="mt-4 text-center">
            <p className="text-lg">
              Slot dipilih: Baris {selectedSlot.row + 1}, Kolom{" "}
              {selectedSlot.col + 1}
            </p>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Masukkan nomor kendaraan"
              className="mt-2 p-2 border rounded w-64"
            />
            <button
              onClick={handleConfirm}
              className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Konfirmasi Masuk
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}

        {isVehicleSelected && (
          <div className="mt-4 text-center">
            <button
              onClick={handleExit}
              className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Keluar Kendaraan
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-md">
            <span className="inline-block w-4 h-4 bg-red-500 mr-2"></span>Terisi
          </p>
          <p className="text-md">
            <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>
            Tersedia
          </p>
          <p className="text-md">
            <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span>
            Dipilih
          </p>
        </div>
      </div>
    </>
  );
};

export default Slot;
