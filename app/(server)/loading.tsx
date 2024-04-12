export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center mt-4">
      <div
        className="inline-block size-6 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-primary"
        role="status"
        aria-label="loading"
      />
      <span>Loading ...</span>
    </div>
  );
}
