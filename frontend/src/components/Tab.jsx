import React, { useState } from "react";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Tab 1", content: "This is content for Tab 1" },
    { id: 1, label: "Tab 2", content: "This is content for Tab 2" },
    { id: 2, label: "Tab 3", content: "This is content for Tab 3" },
  ];

  return (
    <div className="flex flex-col min-h-screen p-12">
      <div className="bg-gray-200 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab px-4 py-2 text-gray-800 font-medium cursor-pointer transition-all ${
              activeTab === tab.id
                ? "bg-white border-t border-r border-l border-gray-300"
                : "bg-gray-100 border border-b-0 border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-grow bg-white border border-gray-300 p-6 shadow-md">
        <p>{tabs[activeTab].content}</p>
      </div>
    </div>
  );
};

export default Tab;
