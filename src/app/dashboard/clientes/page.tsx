"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/currency";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  created_at: string;
  proposals: { id: string; status: string; total_price: number; currency: string; created_at: string }[];
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    const res = await fetch(`/api/clients?${params}`);
    if (res.ok) setClients(await res.json());
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchClients();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#194973]">Clientes</h1>
          <p className="text-[#5A6D6D] text-sm mt-1">Tu base de datos de clientes</p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email o empresa..."
          className="w-full max-w-md px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-white text-[#194973] outline-none transition-colors focus:border-[#71C648]"
        />
      </form>

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>
      ) : clients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">&#128100;</div>
          <div className="text-[#194973] font-bold">No hay clientes</div>
          <div className="text-[#5A6D6D] text-sm mt-1">Los clientes se crean automaticamente al crear propuestas</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => {
            const totalRevenue = client.proposals
              .filter((p) => p.status === "aceptada")
              .reduce((sum, p) => sum + Number(p.total_price), 0);
            const proposalCount = client.proposals.length;

            return (
              <Link
                key={client.id}
                href={`/dashboard/clientes/${client.id}`}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#71C648] hover:shadow-lg hover:shadow-[#71C648]/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#194973] text-white flex items-center justify-center font-bold text-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#194973] truncate">{client.name}</div>
                    {client.company && <div className="text-xs text-[#5A6D6D] truncate">{client.company}</div>}
                  </div>
                </div>
                <div className="text-xs text-[#5A6D6D] mb-3 truncate">{client.email}</div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-[#5A6D6D]">{proposalCount} propuesta{proposalCount !== 1 ? "s" : ""}</div>
                  </div>
                  <div className="text-sm font-bold text-[#71C648]">
                    {totalRevenue > 0 ? formatCurrency(totalRevenue) : "-"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
