export default function AuthLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-primary-600-600 rounded-full dark:text-primary-500"
        role="status"
        aria-label="loading"
      ></div>
      <span className="sr-only">Loading (AuthLoading)...</span>
    </div>
  );
}
