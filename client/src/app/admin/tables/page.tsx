"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createTable,
  deleteTable,
  getAllTables,
  updateTable,
} from "../../lib/api";

interface Table {
  _id: string;
  tableNumber: number;
  capacity: number;
  location: "Indoor" | "Outdoor" | "VIP";
  status: "available" | "maintenance";
}

const initialForm = {
  tableNumber: "",
  capacity: "",
  location: "Indoor",
  status: "available",
} as const;

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [tableToDelete, setTableToDelete] =
    useState<Table | null>(null);

  const [selectedTable, setSelectedTable] =
    useState<Table | null>(null);

  const [formData, setFormData] = useState({
    tableNumber: "",
    capacity: "",
    location: "Indoor",
    status: "available",
  });

  useEffect(() => {
    fetchTables();
  }, []);

  async function fetchTables() {
    try {
      setLoading(true);

      const result = await getAllTables();

      setTables(result.data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredTables = useMemo(() => {
    return tables.filter((table) =>
      table.tableNumber
        .toString()
        .includes(search.trim())
    );
  }, [tables, search]);

  function resetForm() {
    setFormData({
      tableNumber: "",
      capacity: "",
      location: "Indoor",
      status: "available",
    });
  }

  async function handleCreateTable() {
    try {
      await createTable({
        tableNumber: Number(formData.tableNumber),
        capacity: Number(formData.capacity),
        location: formData.location as
          | "Indoor"
          | "Outdoor"
          | "VIP",
        status: formData.status as
          | "available"
          | "maintenance",
      });

      setShowAddModal(false);

      resetForm();

      fetchTables();
    } catch (error: any) {
      alert(error.message);
    }
  }

  function openEditModal(table: Table) {
    setSelectedTable(table);

    setFormData({
      tableNumber: String(table.tableNumber),
      capacity: String(table.capacity),
      location: table.location,
      status: table.status,
    });

    setShowEditModal(true);
  }

  async function handleUpdateTable() {
    if (!selectedTable) return;

    try {
      await updateTable(selectedTable._id, {
        tableNumber: Number(formData.tableNumber),
        capacity: Number(formData.capacity),
        location: formData.location as
          | "Indoor"
          | "Outdoor"
          | "VIP",
        status: formData.status as
          | "available"
          | "maintenance",
      });

      setShowEditModal(false);

      setSelectedTable(null);

      resetForm();

      fetchTables();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleDeleteTable() {
    if (!tableToDelete) return;

    try {
      await deleteTable(tableToDelete._id);

      setTableToDelete(null);

      fetchTables();
    } catch (error: any) {
      alert(error.message);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";

      case "maintenance":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-900 text-gray-900";
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tables Management
          </h1>

          <p className="mt-1 text-gray-600">
            Manage restaurant tables.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
        >
          + Add Table
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by table number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500"
        />
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="px-6 py-4 text-left">Table</th>
              <th className="px-6 py-4 text-left">Capacity</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-900"
                >
                  Loading tables...
                </td>
              </tr>
            ) : filteredTables.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-900"
                >
                  No tables found.
                </td>
              </tr>
            ) : (
              filteredTables.map((table) => (
                <tr
                  key={table._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    Table {table.tableNumber}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {table.capacity} Guests
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {table.location}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                        table.status
                      )}`}
                    >
                      {table.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTable(table);
                          setShowViewModal(true);
                        }}
                        className="rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
                      >
                        View
                      </button>

                      <button
                        onClick={() => openEditModal(table)}
                        className="rounded bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          setTableToDelete(table)
                        }
                        className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {showViewModal && selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Table Details
            </h2>

            <div className="space-y-3 text-gray-800">
              <p>
                <strong className="text-gray-900">Table Number:</strong>{" "}
                {selectedTable.tableNumber}
              </p>

              <p>
                <strong className="text-gray-900">Capacity:</strong>{" "}
                {selectedTable.capacity} Guests
              </p>

              <p>
                <strong className="text-gray-900">Location:</strong>{" "}
                {selectedTable.location}
              </p>

              <p>
                <strong className="text-gray-900">Status:</strong>{" "}
                <span className={`rounded-full px-2 py-0.5 text-sm font-medium ${getStatusColor(selectedTable.status)}`}>
                  {selectedTable.status}
                </span>
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setSelectedTable(null);
                  setShowViewModal(false);
                }}
                className="rounded bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Add Table
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.tableNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tableNumber: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  placeholder="e.g. 4"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value as
                        | "Indoor"
                        | "Outdoor"
                        | "VIP",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500 bg-white"
                >
                  <option className="text-gray-900">Indoor</option>
                  <option className="text-gray-900">Outdoor</option>
                  <option className="text-gray-900">VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as
                        | "available"
                        | "maintenance",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500 bg-white"
                >
                  <option value="available" className="text-gray-900">
                    Available
                  </option>
                  <option value="maintenance" className="text-gray-900">
                    Maintenance
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="rounded bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateTable}
                className="rounded bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Edit Table
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
                <input
                  type="number"
                  value={formData.tableNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tableNumber: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value as
                        | "Indoor"
                        | "Outdoor"
                        | "VIP",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500 bg-white"
                >
                  <option className="text-gray-900">Indoor</option>
                  <option className="text-gray-900">Outdoor</option>
                  <option className="text-gray-900">VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as
                        | "available"
                        | "maintenance",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500 bg-white"
                >
                  <option value="available" className="text-gray-900">
                    Available
                  </option>
                  <option value="maintenance" className="text-gray-900">
                    Maintenance
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedTable(null);
                }}
                className="rounded bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateTable}
                className="rounded bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {tableToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Delete Table
            </h2>

            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900">
                Table {tableToDelete.tableNumber}
              </strong>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setTableToDelete(null)}
                className="rounded bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteTable}
                className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}