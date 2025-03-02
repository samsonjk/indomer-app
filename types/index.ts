export type UnitOption = "m" | "cm" | "mm" | "L/s" | "m³/s" | "m/s";


export type CalculationHistory = {
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
  
