import { UnitOption } from "@/types";

interface UnitSelectorProps {
  label: string;
  value: UnitOption;
  onChange: (unit: UnitOption) => void;
}

const UNIT_OPTIONS: UnitOption[] = ["m", "cm", "mm", "L/s", "m³/s", "m/s"];

export default function UnitSelector({ label, value, onChange }: UnitSelectorProps) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as UnitOption)}
        className="p-2 border rounded w-full"
      >
        {UNIT_OPTIONS.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
}
