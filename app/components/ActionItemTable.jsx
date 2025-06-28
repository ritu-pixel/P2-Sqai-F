"use client";

export default function ActionItemTable({ actionItems = [] }) {
  if (!Array.isArray(actionItems) || actionItems.length === 0) return null;

  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: "var(--font-manrope)" }}>
        Action Items
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-white border-opacity-30 text-black text-sm" style={{ fontFamily: "var(--font-eurostile)" }}>
          <thead className="bg-white/30 text-left">
            <tr>
              <th className="px-4 py-2 border-b border-white border-opacity-30">#</th>
              <th className="px-4 py-2 border-b border-white border-opacity-30">Task</th>
              <th className="px-4 py-2 border-b border-white border-opacity-30">Assignee</th>
              <th className="px-4 py-2 border-b border-white border-opacity-30">Due Date</th>
              <th className="px-4 py-2 border-b border-white border-opacity-30">Category</th>
            </tr>
          </thead>
          <tbody>
            {actionItems.map((item, index) => (
              <tr key={index} className="hover:bg-white/10 transition">
                <td className="px-4 py-2 border-b border-white border-opacity-20">{index + 1}</td>
                <td className="px-4 py-2 border-b border-white border-opacity-20">{item.task || "-"}</td>
                <td className="px-4 py-2 border-b border-white border-opacity-20">{item.assignee || "-"}</td>
                <td className="px-4 py-2 border-b border-white border-opacity-20">
                  {item.due_date ? new Date(item.due_date).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-2 border-b border-white border-opacity-20">{item.category || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
