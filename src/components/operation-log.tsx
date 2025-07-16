"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface OperationLogProps {
  log: string[];
}

const OperationLog: React.FC<OperationLogProps> = ({ log }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [log]);

  const getBadgeVariant = (op: string) => {
    if (op.includes("INSERT")) return "default";
    if (op.includes("Cleared")) return "destructive";
    return "outline";
  };
  
  const getBadgeText = (op: string) => {
    if (op.includes("INSERT")) return "INSERT";
    if (op.includes("Cleared")) return "CLEAR";
    return "LOG";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operation Log</CardTitle>
        <CardDescription>History of tree interactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 w-full">
          <div className="flex flex-col gap-2 pr-4" ref={scrollAreaRef}>
            {log.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50"
              >
                <span className="font-mono text-xs md:text-sm break-all">{entry}</span>
                <Badge variant={getBadgeVariant(entry)} className="ml-2">
                  {getBadgeText(entry)}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OperationLog;
