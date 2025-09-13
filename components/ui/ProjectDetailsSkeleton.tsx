export function ProjectDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
      {/* Left Skeleton */}
      <div className="lg:col-span-5 flex flex-col items-center gap-4">
        <div className="rounded-3xl w-full max-w-md h-[220px] bg-[#232347]/60" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-24 rounded-full bg-[#232347]/60" />
          <div className="h-6 w-20 rounded-full bg-[#232347]/60" />
        </div>
      </div>
      {/* Right Skeleton */}
      <div className="lg:col-span-7 space-y-6">
        <div className="h-10 w-2/3 rounded-lg bg-[#232347]/60" />
        <div className="h-2 w-24 rounded-full bg-[#232347]/60 mb-2" />
        <div className="h-16 w-full rounded-lg bg-[#232347]/60" />
        <div className="flex gap-3 mt-2">
          <div className="h-10 w-28 rounded-lg bg-[#232347]/60" />
          <div className="h-10 w-28 rounded-lg bg-[#232347]/60" />
          <div className="h-10 w-28 rounded-lg bg-[#232347]/60" />
        </div>
        <div className="h-8 w-40 rounded-lg bg-[#232347]/60 mt-4" />
        <div className="flex gap-2 mt-2">
          <div className="h-7 w-16 rounded-md bg-[#232347]/60" />
          <div className="h-7 w-16 rounded-md bg-[#232347]/60" />
          <div className="h-7 w-16 rounded-md bg-[#232347]/60" />
        </div>
        <div className="h-8 w-32 rounded-lg bg-[#232347]/60 mt-4" />
        <div className="space-y-2 mt-2">
          <div className="h-5 w-full rounded bg-[#232347]/60" />
          <div className="h-5 w-2/3 rounded bg-[#232347]/60" />
          <div className="h-5 w-1/2 rounded bg-[#232347]/60" />
        </div>
      </div>
    </div>
  );
}
