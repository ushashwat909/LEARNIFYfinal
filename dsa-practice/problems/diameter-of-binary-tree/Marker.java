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
    private int diameter;
    
    // Find the diameter of the binary tree
    public int solve(TreeNode A) {
        diameter = 0;
        height(A);
        return diameter;
    }
    
    // Helper method to calculate height and update diameter
    private int height(TreeNode root) {
        if (root == null) {
            return -1; // Return -1 so height of leaf nodes becomes 0
        }
        
        int lh = height(root.left);
        int rh = height(root.right);
        
        // Diameter passing through current node
        int curDia = lh + rh + 2;
        diameter = Math.max(diameter, curDia);
        
        // Return height of current subtree
        return Math.max(lh, rh) + 1;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


