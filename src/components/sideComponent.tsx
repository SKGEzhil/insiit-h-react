
function SideComponent() {
  return (
    <div className="fixed top-36 ">
      <div className="bg-bg-3 w-full max-w-64 h-screen">
        <div className="p-4">
          <h1 className="text-2xl font-bold">InsIIT</h1>
          <p className="text-lg">All the Insights you need!</p>
        </div>
        <div className="flex flex-col">
          <button className="bg-bg-2 p-4 my-2">Public Forum</button>
          <button className="bg-bg-2 p-4 my-2">FAQs</button>
          <button className="bg-bg-2 p-4 my-2">Insights</button>
          <button className="bg-bg-2 p-4 my-2">JoSAA</button>
          <button className="bg-bg-2 p-4 my-2">About Us</button>
        </div>
      </div>
    </div>
  );
}

export default SideComponent;