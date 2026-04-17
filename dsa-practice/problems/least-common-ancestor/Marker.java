// Definition for a binary tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { 
        val = x; 
        left = null;
        right = null;
    }
}

class Marker {
    private boolean foundB;
    private boolean foundC;
    
    // Find the lowest common ancestor of two nodes with values B and C
    public int lca(TreeNode A, int B, int C) {
        // Special case: same target
        if (B == C) {
            // Check if B exists in the tree
            return exists(A, B) ? B : -1;
        }
        
        foundB = false;
        foundC = false;
        
        TreeNode result = lcaHelper(A, B, C);
        
        // Return result only if both B and C were found
        if (result != null && foundB && foundC) {
            return result.val;
        }
        
        return -1;
    }
    
    // Helper method to check if a value exists in the tree
    private boolean exists(TreeNode root, int x) {
        if (root == null) {
            return false;
        }
        if (root.val == x) {
            return true;
        }
        return exists(root.left, x) || exists(root.right, x);
    }
    
    // Helper method to find LCA recursively
    private TreeNode lcaHelper(TreeNode root, int B, int C) {
        if (root == null) {
            return null;
        }
        
        // Recursively search in left and right subtrees
        TreeNode left = lcaHelper(root.left, B, C);
        TreeNode right = lcaHelper(root.right, B, C);
        
        // Check if current node matches B or C
        if (root.val == B) {
            foundB = true;
            return root;
        }
        if (root.val == C) {
            foundC = true;
            return root;
        }
        
        // If both left and right subtrees found nodes, current node is LCA
        if (left != null && right != null) {
            return root;
        }
        
        // Return the non-null result from subtrees
        return left != null ? left : right;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int B, int C, int output) {
        int expected = lca(A, B, C);
        return expected == output;
    }
}


