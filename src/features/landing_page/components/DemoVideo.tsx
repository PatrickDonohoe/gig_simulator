const DemoVideo = () => {
  return (
    <section
      id="video-container"
      className="flex flex-col items-center gap-2 min-[968px]:flex-row md:gap-8 w-full"
    >
      <div className="flex flex-col md:gap-4 md:max-w-1/3">
        <h2 className="text-2xl font-bold text-shadow-md">
          Setlist Builder at work
        </h2>
        <span className="font-semibold text-shadow-sm">
          Drag and drop songs from your library to build a setlist.
        </span>
        <span className="font-semibold text-shadow-sm">
          ** Demo video coming soon. **
        </span>
      </div>

      <video
      className="aspect-video max-w-200 h-auto"
        src={undefined}
        controls
        autoPlay
        muted
        loop
      >
        Video is missing or unsupported.
      </video>
    </section>
  );
};
export default DemoVideo;
