// src/components/StatCard.js
const StatCard = ({ title, value, icon, highlight = false }) => {
  return (
    <div
      className={`bg-secondary rounded-lg p-6 ${
        highlight ? "ring-2 ring-contrast" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
};

export default StatCard;
