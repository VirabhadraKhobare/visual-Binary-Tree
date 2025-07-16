
"use client";

import { useBinaryTree } from "@/hooks/use-binary-tree";
import TreeVisualizer from "@/components/tree-visualizer";
import TreeControls from "@/components/tree-controls";
import OperationLog from "@/components/operation-log";
import { Sun, Moon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const {
    root,
    insert,
    clear,
    operationLog,
    lastOperation,
    selectedNodeKey,
    setSelectedNodeKey,
  } = useBinaryTree();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleInsert = (value: number, direction: 'left' | 'right') => {
    if (selectedNodeKey === null && root !== null) {
      toast({
        variant: "destructive",
        title: "No parent selected",
        description: "Please select a parent node before inserting.",
      });
      return;
    }
    try {
      insert(selectedNodeKey, value, direction);
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow grid md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2">
          <TreeVisualizer
            root={root}
            highlightedNodeKey={lastOperation?.type === 'insert' ? lastOperation.key : null}
            selectedNodeKey={selectedNodeKey}
            onNodeClick={setSelectedNodeKey}
          />
        </div>

        <aside className="md:col-span-1 flex flex-col gap-6">
          <TreeControls
            onInsert={handleInsert}
            onClear={clear}
            selectedNodeKey={selectedNodeKey}
          />
          <OperationLog log={operationLog} />
        </aside>
      </main>
      
      <footer className="w-full p-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by unstring
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-auto w-auto p-1">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
