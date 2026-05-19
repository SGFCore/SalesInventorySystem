import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useEmp } from "@/context/empContext";
import { cn } from "@/lib/utils";

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  roles: number[];
}

interface GroupedPageLayoutProps {
  title: string;
  tabs: TabConfig[];
}

export function GroupedPageLayout({ title, tabs }: GroupedPageLayoutProps) {
  const { hasRole } = useEmp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter tabs that the user is authorized to see
  const authorizedTabs = tabs.filter((tab) =>
    tab.roles.some((role) => hasRole(role))
  );

  const activeTabId = searchParams.get("tab") || (authorizedTabs[0]?.id || "");

  // If the active tab is not in the authorized tabs list (e.g. direct link with wrong tab),
  // set it to the first authorized tab
  useEffect(() => {
    if (authorizedTabs.length > 0 && !authorizedTabs.some((t) => t.id === activeTabId)) {
      setSearchParams({ tab: authorizedTabs[0].id }, { replace: true });
    }
  }, [activeTabId, authorizedTabs, setSearchParams]);

  const activeTab = authorizedTabs.find((t) => t.id === activeTabId) || authorizedTabs[0];

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  if (authorizedTabs.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        Bạn không có quyền truy cập vào các màn hình thuộc chủ đề này.
      </div>
    );
  }

  const ActiveComponent = activeTab?.component;

  return (
    <div className="flex flex-col h-full bg-slate-50/40">
      {/* Sleek top header panel with page title & glassmorphism tabs */}
      <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-0 sticky top-0 z-10 shadow-sm shadow-slate-100/50">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-4 select-none">
          {title}
        </h1>

        <div className="flex border-b border-slate-100 -mb-px overflow-x-auto scrollbar-none gap-2">
          {authorizedTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-out whitespace-nowrap",
                  isActive
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-slate-500 hover:text-blue-600 hover:border-slate-300"
                )}
              >
                <span className={cn(
                  "p-1 rounded-md transition-colors",
                  isActive ? "bg-blue-50 text-blue-600" : "bg-transparent text-slate-400 group-hover:text-blue-600"
                )}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main active tab panel content */}
      <div className="flex-1 overflow-auto">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
