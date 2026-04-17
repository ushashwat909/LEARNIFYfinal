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
    // Find the LCA of two nodes in a BST
    // In BST, we can use the property: left < root < right
    public int solve(TreeNode A, int B, int C) {
        // Iterative approach
        TreeNode current = A;
        
        while (current != null) {
            // If both B and C are less than current node, LCA is in left subtree
            if (B < current.val && C < current.val) {
                current = current.left;
            }
            // If both B and C are greater than current node, LCA is in right subtree
            else if (B > current.val && C > current.val) {
                current = current.right;
            }
            // Otherwise, current node is the LCA
            // This happens when:
            // - One is less and one is greater
            // - One equals current node
            // - Both equal current node (though this case is handled by the problem)
            else {
                return current.val;
            }
        }
        
        // Should not reach here since nodes are guaranteed to exist
        return -1;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int B, int C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}


