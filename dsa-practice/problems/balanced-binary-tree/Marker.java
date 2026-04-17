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
    private boolean isBalanced;
    
    // Check if binary tree is height-balanced
    public int isBalanced(TreeNode A) {
        isBalanced = true;
        height(A);
        return isBalanced ? 1 : 0;
    }
    
    // Helper method to calculate height and check balance
    private int height(TreeNode root) {
        if (root == null) {
            return -1; // Return -1 for null nodes (height of empty tree)
        }
        
        // Calculate height of left and right subtrees
        int lh = height(root.left);
        int rh = height(root.right);
        
        // Check if current node is balanced
        if (Math.abs(lh - rh) > 1) {
            isBalanced = false;
        }
        
        // Return height of current subtree
        return Math.max(lh, rh) + 1;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int output) {
        int expected = isBalanced(A);
        return expected == output;
    }
}

