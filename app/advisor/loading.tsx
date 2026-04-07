export default function AdvisorLoading() {
  return (
    <div className="min-h-screen bg-stone-900">
      <div className="flex items-center justify-between px-5 sm:px-8 py-5">
        <div className="h-8 w-28 bg-white/10 rounded-lg animate-pulse" />
        <div className="h-5 w-16 bg-white/10 rounded-lg animate-pulse" />
      </div>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-7 sm:p-9 space-y-6">
          <div className="h-6 w-48 bg-white/10 rounded-lg animate-pulse mx-auto" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-white/10 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
