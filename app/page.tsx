"use client";

import { useState } from "react";
import { exportHistoryToExcel } from "@/lib/exportUtils";
import UnitSelector from "@/components/UnitSelector";
import SessionManager from "@/components/SessionManager";
import { UnitOption } from "@/types";
import { useRef } from "react";

type CalculationHistory = {
  diameter?: number;
  q?: number;
  v?: number;
  timestamp: string;
  units: {
    diameter: string;
    q: string;
    v: string;
  };
};

export default function Home() {
  const [diameter, setDiameter] = useState<number | undefined>();
  const [q, setQ] = useState<number | undefined>();
  const [v, setV] = useState<number | undefined>();

  const [diameterUnit, setDiameterUnit] = useState<UnitOption>("m");
  const [qUnit, setQUnit] = useState<UnitOption>("L/s");
  const [vUnit, setVUnit] = useState<UnitOption>("m/s");

  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [sessionName, setSessionName] = useState<string>("DefaultSession");
  const sessions = useRef<Record<string, CalculationHistory[]>>({});

  const calculate = () => {
    let newDiameter = diameter;
    let newQ = q;
    let newV = v;

    if (diameter !== undefined && q !== undefined) {
      newV = Math.pow(0.1215 * Math.sqrt(q) / diameter, 2);
      setV(newV);
    } else if (diameter !== undefined && v !== undefined) {
      newQ = Math.pow((diameter * Math.sqrt(v)) / 0.1215, 2);
      setQ(newQ);
    } else if (q !== undefined && v !== undefined) {
      newDiameter = (0.1215 * Math.sqrt(q)) / Math.sqrt(v);
      setDiameter(newDiameter);
    } else {
      alert("Please provide any two values to calculate the third.");
      return;
    }

    setHistory((prev) => [
      ...prev,
      {
        diameter: newDiameter,
        q: newQ,
        v: newV,
        timestamp: new Date().toLocaleString(),
        units: {
          diameter: diameterUnit,
          q: qUnit,
          v: vUnit,
        },
      },
    ]);
  };

  const reset = () => {
    setDiameter(undefined);
    setQ(undefined);
    setV(undefined);
  };

  const saveSession = () => {
    sessions.current[sessionName] = [...history];
    alert(`Session "${sessionName}" saved!`);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6">Diameter, Q, V Calculator</h1>

      <SessionManager
        sessionName={sessionName}
        setSessionName={setSessionName}
        saveSession={saveSession}
      />

      <div className="grid grid-cols-1 gap-6 mt-6">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Diameter"
            value={diameter ?? ""}
            onChange={(e) =>
              setDiameter(e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="p-2 border rounded w-full"
          />
          <UnitSelector
            label="Diameter"
            value={diameterUnit}
            onChange={setDiameterUnit}
          />
        </div>


        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Q"
            value={q ?? ""}
            onChange={(e) =>
              setQ(e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="p-2 border rounded w-full"
          />
          <UnitSelector label="Q" value={qUnit} onChange={setQUnit} />
        </div>




        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="V"
            value={v ?? ""}
            onChange={(e) =>
              setV(e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="p-2 border rounded w-full"
          />
          <UnitSelector label="V" value={vUnit} onChange={setVUnit} />
        </div>



        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={calculate}
            className="bg-blue-500 text-white p-3 rounded flex-1"
          >
            Calculate
          </button>

          <button
            onClick={reset}
            className="bg-yellow-500 text-white p-3 rounded flex-1"
          >
            Reset
          </button>

          <button
            onClick={() => exportHistoryToExcel(history, sessionName)}
            className="bg-green-500 text-white p-3 rounded flex-1"
          >
            Export  to Excel
          </button>
        </div>

      </div>

      <h2 className="text-2xl font-semibold mt-10">Calculation History</h2>
      <ul className="mt-4 space-y-2">
        {history.map((entry, index) => (
          <li key={index} className="border p-3 rounded">
            <div>
              <strong>Time:</strong> {entry.timestamp}
            </div>
            <div>
              <strong>Diameter:</strong> {entry.diameter ?? "N/A"} {entry.units.diameter}
            </div>
            <div>
              <strong>Q:</strong> {entry.q ?? "N/A"} {entry.units.q}
            </div>
            <div>
              <strong>V:</strong> {entry.v ?? "N/A"} {entry.units.v}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
