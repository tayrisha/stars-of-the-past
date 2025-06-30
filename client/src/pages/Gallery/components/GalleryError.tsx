const GalleryError = () => (
  <div className="relative w-screen h-screen flex flex-col">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/GalleryError.jpg')" }}
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

    <div className="relative z-10 flex flex-col justify-center items-center h-full w-full px-4 md:px-8 lg:px-16 text-center max-w-screen-lg mx-auto">
      <h1
        className="  bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg 
              p-6 text-gray-100 font-serif text-xl md:text-2xl leading-relaxed [text-shadow:0_0_4px_silver]"
        tabIndex={0}
      >
        We couldn’t reach the stars right now. Please try again later!
      </h1>
    </div>
  </div>
);

export default GalleryError;
