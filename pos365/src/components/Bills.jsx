import { useEffect, useState } from "react";

export default function BillsPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bills")) || [];

    // Sort by date (newest first)
    saved.sort((a, b) => new Date(b.date) - new Date(a.date));

    setBills(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="p-3 w-full">  {/* <-- full width, removed max-w-md */}
        <p className="text-lg font-bold mb-3 text-center">Rechnung</p>

        <div className="space-y-3">
          {bills.map((bill, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 shadow-sm bg-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-base font-semibold">
                  Tisch {bill.table}
                </h2>

                <span className="text-[10px] text-gray-500">
                  {new Date(bill.date).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Items */}
              <div className="mt-1">
                {bill.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm border-b py-1 last:border-0"
                  >
                    <span className="truncate w-[65%]">{item.name}</span>
                    <span className="font-medium">{item.price}€</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-right mt-2 font-bold text-green-700 text-base">
                Total: {bill.total.toFixed(2)}€
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );

}
