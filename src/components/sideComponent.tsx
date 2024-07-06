import TagComponent from "./tagComponent.tsx";
import {tagDict} from "../config/constants.ts";

function SideComponent() {


  return (
      <div className="fixed top-24 bottom-2 mb-6 m-4">
          <div className="bg-bg-3 w-full max-w-64 overflow-auto rounded-xl" style={{height: "80vh"}}>
              <div className="flex flex-col">
                  <div className="p-4">
                      <h2 className="text-xl font-bold text-left my-3">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                          {tagDict.map((tag, index) => (
                              <TagComponent tag={tag} key={index}/>
                          ))}
                      </div>
                  </div>
                  <div className="p-4">
                      <h2 className="text-xl font-bold">Categories</h2>
                      <div className="flex flex-col gap-2">
                      <span
                          className="inline-block bg-bg-5 text-gray-300 text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 1</span>
                          <span
                              className="inline-block bg-bg-5 text-gray-300 text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 2</span>
                          <span
                              className="inline-block bg-bg-5 text-gray-300 text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 3</span>
                          <span
                              className="inline-block bg-bg-5 text-gray-300 text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 4</span>
                          <span
                              className="inline-block bg-bg-5 text-gray-300 text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 5</span>
                          <span
                              className="inline-block bg-bg-5 text-gray-300 text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 6</span>
                      </div>
                  </div>

              </div>
          </div>

      </div>

  );
}

export default SideComponent;