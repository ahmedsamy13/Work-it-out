import { type ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  hideOnMobile?: boolean; // hidden below lg screens
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  rightSlot?: ReactNode; // anything to render on the right of the tab bar
  onTabChange?: (tabId: string) => void; // callback when a tab is clicked
}

export function Tabs({ tabs, defaultTab, className = "", rightSlot, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={className}>
      {/* Tab bar + right slot in one row */}
      <div className="flex items-end justify-between border-b border-border gap-2">
        {/* Scrollable tab list */}
        <div
          role="tablist"
          className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`shrink-0 px-4 py-2.5 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px cursor-pointer ${tab.hideOnMobile ? "hidden lg:inline-flex" : ""} ${
                activeTab === tab.id
                  ? "border-brand text-text-brand"
                  : "border-transparent text-text-secondary hover:text-text-subtle hover:border-border-subtle"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right-side slot (e.g. Filters button) */}
        {rightSlot && (
          <div className="shrink-0 pb-1">
            {rightSlot}
          </div>
        )}
      </div>

      {/* Tab content */}
      <div className="mt-4" role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
}
