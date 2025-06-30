
const GalleryLoading = () => (
  <div className="relative w-screen h-screen flex flex-col">
   
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/GalleryLoading.jpg')" }}
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
    <div className="relative z-10 flex flex-col justify-center items-center h-full w-full px-4 md:px-8 lg:px-16 text-center max-w-screen-lg mx-auto">
      <div className="mb-6 flex justify-center items-center">
        <span
          className="inline-block w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
   
      <h1
        className="text-gray-100 font-serif text-xl md:text-2xl leading-relaxed [text-shadow:0_0_4px_silver]"
        tabIndex={0}
      >
        Your stars are loading
      </h1>
    </div>
  </div>
);

export default GalleryLoading;
