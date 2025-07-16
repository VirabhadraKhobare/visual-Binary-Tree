
"use client";

import { useRef, useEffect, useState } from "react";
import type { FC, MouseEvent } from "react";
import { useTheme } from "next-themes";
import type { TreeNode } from "@/hooks/use-binary-tree";

interface TreeVisualizerProps {
  root: TreeNode | null;
  highlightedNodeKey: number | null;
  selectedNodeKey: number | null;
  onNodeClick: (key: number) => void;
}

const NODE_RADIUS = 25;
const VERTICAL_SPACING = 80;

const TreeVisualizer: FC<TreeVisualizerProps> = ({ root, highlightedNodeKey, selectedNodeKey, onNodeClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [highlightTimer, setHighlightTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentlyHighlighted, setCurrentlyHighlighted] = useState<number | null>(null);
  const nodePositions = useRef(new Map<number, { x: number; y: number }>());

  useEffect(() => {
    if (highlightedNodeKey !== null) {
      if (highlightTimer) clearTimeout(highlightTimer);
      setCurrentlyHighlighted(highlightedNodeKey);
      const timer = setTimeout(() => {
        setCurrentlyHighlighted(null);
        setHighlightTimer(null);
      }, 1000);
      setHighlightTimer(timer);
    }
  }, [highlightedNodeKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const { width, height } = rect;

    const isDark = resolvedTheme === "dark";
    const backgroundColor = isDark ? "#09090b" : "#fafafa";
    const foregroundColor = isDark ? "#fafafa" : "#09090b";
    const nodeColor = isDark ? "#27272a" : "#ffffff";
    const nodeBorderColor = foregroundColor;
    const highlightedColor = isDark ? "#a1a1aa" : "#e4e4e7";
    const selectedColor = isDark ? "#3b82f6" : "#60a5fa";

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (!root) return;

    const currentPositions = new Map<number, { x: number; y: number }>();
    let minX = Infinity, maxX = -Infinity;

    function calculatePositions(node: TreeNode | null, x: number, y: number, horizontalGap: number) {
      if (!node) return;
      
      currentPositions.set(node.value, { x, y });
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);

      const nextHorizontalGap = horizontalGap * 0.6;
      if (node.left) {
        calculatePositions(node.left, x - horizontalGap, y + VERTICAL_SPACING, nextHorizontalGap);
      }
      if (node.right) {
        calculatePositions(node.right, x + horizontalGap, y + VERTICAL_SPACING, nextHorizontalGap);
      }
    }
    
    const initialHorizontalGap = width / 4;
    calculatePositions(root, width / 2, 80, initialHorizontalGap);
    
    const contentWidth = maxX - minX;
    const scale = contentWidth > width - NODE_RADIUS * 4 ? (width - NODE_RADIUS * 4) / contentWidth : 1;
    const offsetX = (width - (contentWidth) * scale) / 2 - minX * scale;
    
    nodePositions.current.clear();
    for (const [key, pos] of currentPositions.entries()) {
        nodePositions.current.set(key, {x: pos.x * scale + offsetX, y: pos.y})
    }

    function drawTree(node: TreeNode | null) {
      if (!node) return;

      const pos = nodePositions.current.get(node.value);
      if (!pos) return;

      if (node.left) {
        const leftPos = nodePositions.current.get(node.left.value);
        if (leftPos) {
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(leftPos.x, leftPos.y);
          ctx.strokeStyle = foregroundColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      if (node.right) {
        const rightPos = nodePositions.current.get(node.right.value);
        if (rightPos) {
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(rightPos.x, rightPos.y);
          ctx.strokeStyle = foregroundColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, NODE_RADIUS, 0, Math.PI * 2);

      if (selectedNodeKey === node.value) {
          ctx.fillStyle = selectedColor;
      } else if (currentlyHighlighted === node.value) {
          ctx.fillStyle = highlightedColor;
      } else {
          ctx.fillStyle = nodeColor;
      }

      ctx.fill();
      ctx.strokeStyle = nodeBorderColor;
      ctx.lineWidth = selectedNodeKey === node.value ? 3 : 2;
      ctx.stroke();

      // Draw text
      ctx.fillStyle = foregroundColor;
      ctx.font = "bold 16px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(node.value), pos.x, pos.y);

      // Recurse
      drawTree(node.left);
      drawTree(node.right);
    }
    
    drawTree(root);

  }, [root, resolvedTheme, currentlyHighlighted, highlightedNodeKey, selectedNodeKey]);

  const handleCanvasClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let clickedNodeKey: number | null = null;
    for (const [key, pos] of nodePositions.current.entries()) {
        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        if (distance <= NODE_RADIUS) {
            clickedNodeKey = key;
            break;
        }
    }

    if (clickedNodeKey !== null) {
        onNodeClick(clickedNodeKey);
    }
  };


  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full min-h-[500px] md:min-h-full rounded-lg border bg-card"
      onClick={handleCanvasClick}
    />
  );
};

export default TreeVisualizer;
