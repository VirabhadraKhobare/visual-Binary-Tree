
"use client";

import { useState, useCallback } from "react";

export class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export const useBinaryTree = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [lastOperation, setLastOperation] = useState<{ type: string; key: number; } | null>(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState<number | null>(null);

  const findNode = (node: TreeNode | null, key: number): TreeNode | null => {
    if (node === null || node.value === key) {
      return node;
    }
    return findNode(node.left, key) || findNode(node.right, key);
  };
  
  const valueExists = (node: TreeNode | null, value: number): boolean => {
    if (node === null) return false;
    if (node.value === value) return true;
    return valueExists(node.left, value) || valueExists(node.right, value);
  }

  const insert = useCallback((parentKey: number | null, value: number, direction: 'left' | 'right') => {
    const newNode = new TreeNode(value);

    setRoot(prevRoot => {
      // Deep copy to ensure state update and re-render
      const newRoot = prevRoot ? JSON.parse(JSON.stringify(prevRoot)) : null;
      const rehydratedRoot = newRoot ? rehydrateTree(newRoot) : null;

      if (valueExists(rehydratedRoot, value)) {
        throw new Error(`Value ${value} already exists in the tree.`);
      }

      if (rehydratedRoot === null) {
        if (parentKey !== null) {
          throw new Error("Cannot insert into a non-existent root.");
        }
        setOperationLog(prev => [...prev, `CREATE ROOT ${value}`]);
        setSelectedNodeKey(value);
        setLastOperation({ type: "insert", key: value });
        return newNode;
      }
      
      const parentNode = parentKey === null ? null : findNode(rehydratedRoot, parentKey);

      if (parentNode === null) {
        throw new Error(`Parent node with key ${parentKey} not found.`);
      }

      if (direction === 'left' && parentNode.left !== null) {
        throw new Error(`Left child of ${parentKey} already exists.`);
      }
      if (direction === 'right' && parentNode.right !== null) {
        throw new Error(`Right child of ${parentKey} already exists.`);
      }

      if (direction === 'left') {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }
      
      setOperationLog(prev => [...prev, `INSERT ${value} as ${direction} of ${parentKey}`]);
      setLastOperation({ type: "insert", key: value });
      setSelectedNodeKey(value); // Select the newly inserted node
      return rehydratedRoot;
    });
  }, []);

  const clear = useCallback(() => {
    setRoot(null);
    setOperationLog(["Cleared the tree."]);
    setLastOperation(null);
    setSelectedNodeKey(null);
  }, []);
  
  // Helper to re-create the tree structure from a plain object
  const rehydrateTree = (nodeData: any): TreeNode => {
      const node = new TreeNode(nodeData.value);
      if (nodeData.left) {
          node.left = rehydrateTree(nodeData.left);
      }
      if (nodeData.right) {
          node.right = rehydrateTree(nodeData.right);
      }
      return node;
  };

  return { root, insert, clear, operationLog, lastOperation, selectedNodeKey, setSelectedNodeKey };
};
