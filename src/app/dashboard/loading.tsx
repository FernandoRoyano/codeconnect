export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#71C648] rounded-full animate-spin" />
        <span className="text-sm text-[#5A6D6D]">Cargando...</span>
      </div>
    </div>
  );
}
