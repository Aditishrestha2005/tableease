"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllActivityLogs } from "../../lib/api";

interface ActivityLog {
  _id: string;

  user: {
    name: string;
    email: string;
    role: string;
  };

  action: string;

  description: string;

  createdAt: string;
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedLog, setSelectedLog] =
    useState<ActivityLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

 async function fetchLogs() {
  try {
    setLoading(true);

    const result = await getAllActivityLogs();

    console.log(result.data);

    result.data.forEach((log: any) => {
  if (!log.user) {
    console.log("Missing user:", log);
  }
});

    setLogs(result.data);
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
}

  function getActionColor(action: string) {
    if (action.includes("LOGIN"))
      return "bg-green-100 text-green-700";

    if (action.includes("RESERVATION"))
      return "bg-blue-100 text-blue-700";

    if (action.includes("TABLE"))
      return "bg-yellow-100 text-yellow-700";

    if (action.includes("USER"))
      return "bg-purple-100 text-purple-700";

    if (action.includes("PASSWORD"))
      return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  }

const filteredLogs = useMemo(() => {
  return logs.filter((log) => {
    const keyword = search.toLowerCase();

    const name = log.user?.name?.toLowerCase() ?? "";
    const email = log.user?.email?.toLowerCase() ?? "";
    const action = log.action?.toLowerCase() ?? "";
    const description = log.description?.toLowerCase() ?? "";

    return (
      name.includes(keyword) ||
      email.includes(keyword) ||
      action.includes(keyword) ||
      description.includes(keyword)
    );
  });
}, [logs, search]);

  return (
    <div className="p-6">

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Activity Logs
        </h1>

        <p className="mt-1 text-gray-600">
          Monitor important system activities.
        </p>

      </div>

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
        />

      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                User
              </th>

              <th className="px-6 py-4 text-left">
                Action
              </th>

              <th className="px-6 py-4 text-left">
                Description
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-center">
                View
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-600"
                >
                  Loading activity logs...
                </td>

              </tr>

            ) : filteredLogs.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-600"
                >
                  No activity found.
                </td>

              </tr>

            ) : (

              filteredLogs.map((log) => (

                <tr
                  key={log._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div className="font-semibold text-gray-900">
                     {log.user?.name ?? "Deleted User"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {log.user?.email ?? "-"}
                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getActionColor(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {log.description}
                  </td>

                  <td className="px-6 py-4 text-gray-700">

                    {new Date(
                      log.createdAt
                    ).toLocaleString()}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          setSelectedLog(log)
                        }
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        View
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
            {/* View Activity Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Activity Details
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  User
                </span>

                <span className="text-gray-900">
                  {selectedLog.user.name}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Email
                </span>

                <span className="text-gray-900">
                 {selectedLog.user?.email ?? "-"} 
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Role
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    selectedLog.user.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                {selectedLog.user?.role ?? "Unknown"}  
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Action
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getActionColor(
                    selectedLog.action
                  )}`}
                >
                  {selectedLog.action}
                </span>
              </div>

              <div className="border-b pb-4">
                <p className="mb-2 font-semibold text-gray-700">
                  Description
                </p>

                <p className="rounded-lg bg-gray-50 p-4 text-gray-800">
                  {selectedLog.description}
                </p>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Date & Time
                </span>

                <span className="text-gray-900">
                  {new Date(
                    selectedLog.createdAt
                  ).toLocaleString()}
                </span>
              </div>

            </div>

            <div className="mt-8 flex justify-end">

              <button
                onClick={() =>
                  setSelectedLog(null)
                }
                className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}