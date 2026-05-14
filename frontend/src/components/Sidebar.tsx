import { ChevronRight } from "lucide-react";
import { sidebarData } from "@/data/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <nav className="space-y-0.5">
          {" "}
          {/* Giảm khoảng cách giữa các item lớn */}
          {sidebarData.map((item) => (
            <div key={item.id} className="w-full">
              {item.children && item.children.length > 0 ? (
                <Collapsible
                  defaultOpen={["management", "sales"].includes(item.id)}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between px-2 h-9 text-sm font-medium text-slate-700 rounded-md hover:bg-blue-50 transition-colors group">
                      <span>{item.label}</span>
                      <ChevronRight
                        size={14}
                        className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-slate-400"
                      />
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="ml-4 mt-0.5 border-l border-slate-100 flex flex-col">
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href={`#${child.id}`}
                          className="h-8 flex items-center px-4 text-[13px] text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-r-md transition-all border-l border-transparent hover:border-blue-500 -ml-[1px]"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <a
                  href={`#${item.id}`}
                  className="flex items-center px-2 h-9 text-sm font-medium text-slate-700 rounded-md hover:bg-blue-50 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
