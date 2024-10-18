// 定义 TreeNode 接口（如果已经定义，可直接导入）
export interface TreeNode {
    label: string;
    directory: boolean;
    children: TreeNode[];
    path: string;
    isEditing?: boolean;
    isNew?: boolean;
  }
  
  // 查找父节点的辅助函数
  export function findParentNode(
    treeNodes: TreeNode[],
    targetNode: TreeNode
  ): TreeNode | null {
    for (const node of treeNodes) {
      if (node.children && node.children.includes(targetNode)) {
        return node;
      } else if (node.children && node.children.length > 0) {
        const parent = findParentNode(node.children, targetNode);
        if (parent) return parent;
      }
    }
    return null;
  }

  export const findNodeByPath = (nodes: TreeNode[], path: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.path === path) return node;
      if (node.children && node.children.length > 0) {
        const found = findNodeByPath(node.children, path);
        if (found) return found;
      }
    }
    return null;
  };



  