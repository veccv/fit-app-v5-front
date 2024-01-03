export default function Home() {
  return (
    <div>
      <div className="h-20 border flex w-full justify-between items-center px-5">
        <p>Logo</p>
        <button className="hover:bg-gray-400 h-10 w-32 rounded transition-colors duration-500 ease-in-out">
          Zaloguj się
        </button>
      </div>
      <div className="flex flex-col h-full w-full pt-10 items-center gap-10 px-10 lg:px-56 xl:px-96">
        <div className="border rounded p-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          autem corporis culpa deserunt dolorem doloribus eius et, facilis
          impedit molestias nesciunt nisi quae qui quia quos reprehenderit,
          tempora velit voluptas voluptatem voluptatibus? Alias error explicabo
          voluptatum. Consequatur, delectus expedita illum natus officia quis
          rem? Ad eligendi nisi porro ratione soluta.
        </div>
        <div className="border rounded p-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          autem corporis culpa deserunt dolorem doloribus eius et, facilis
          impedit molestias nesciunt nisi quae qui quia quos reprehenderit,
          tempora velit voluptas voluptatem voluptatibus? Alias error explicabo
          voluptatum. Consequatur, delectus expedita illum natus officia quis
          rem? Ad eligendi nisi porro ratione soluta.
        </div>
      </div>
    </div>
  );
}
