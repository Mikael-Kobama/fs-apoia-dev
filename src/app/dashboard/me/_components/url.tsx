export function urlPreview() {
  return (
    <form action="">
      <div className="flex items-center jutify-center w-full">
        <p>http://minha_url.com/creator/fulano-dev</p>
        <input
          type="text"
          className="flex-1 outline-none border h-9 border-gray-300 text-black"
        />
      </div>
    </form>
  );
}
