export default function Loading() {
  return (
    <div className="min-h-screen bg-supreme-gray flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-supreme-blue rounded-full animate-spin" />
        </div>
        
        <p className="text-gray-600 font-manrope text-sm">Loading Supreme Group...</p>
      </div>
    </div>
  );
}