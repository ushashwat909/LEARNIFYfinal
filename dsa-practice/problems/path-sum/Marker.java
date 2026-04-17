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
    // Check if there exists a root-to-leaf path with given sum
    public int hasPathSum(TreeNode A, int B) {
        if (A == null) {
            return 0;
        }
        
        // If it's a leaf node, check if value equals remaining sum
        if (A.left == null && A.right == null) {
            return (A.val == B) ? 1 : 0;
        }
        
        // Recursively check left and right subtrees with reduced sum
        int leftResult = hasPathSum(A.left, B - A.val);
        int rightResult = hasPathSum(A.right, B - A.val);
        
        // Return 1 if either path exists, else 0
        return (leftResult == 1 || rightResult == 1) ? 1 : 0;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int B, int output) {
        int expected = hasPathSum(A, B);
        return expected == output;
    }
}


