function HomeLoading() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div
        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-primary"
        role="status"
        aria-label="loading"
      ></div>
      <span className="sr-only">Loading (App)...</span>
    </div>
  );
}

export default HomeLoading;
