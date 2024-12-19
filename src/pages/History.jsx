import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import useAuth from "../hooks/useAuth";

const History = () => {
  const [history, setHistory] = useState([]);
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("parkingHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <>
      <Navbar />
      <section className="container min-h-screen bg-slate-200 min-w-full">
        <h1 className="text-2xl font-bold text-center py-4">History Parkir</h1>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-400 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-800 dark:divide-gray-700 border-collapse">
                  <thead className="divide-y divide-gray-800">
                    <tr>
                      <th className="px-4 py-2 text-center border-b">
                        Nomor Kendaraan
                      </th>
                      <th className="px-4 py-2 text-center border-b">Aksi</th>
                      <th className="px-4 py-2 text-center border-b">Slot</th>
                      <th className="px-4 py-2 text-center border-b">Waktu</th>
                      <th className="px-4 py-2 text-center border-b">Tempat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 bg-white">
                    {history.length > 0 ? (
                      history.map((entry, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-center border-b">
                            {entry.vehicle}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {entry.action}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {entry.slot}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {entry.timestamp}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {entry.namaGedung}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-2 text-center border-b"
                        >
                          Tidak ada history parkir.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
