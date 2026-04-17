import java.util.*;

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
    private Set<Integer> subtreeSums;
    
    // Check if tree can be partitioned into two equal sum trees
    public int solve(TreeNode A) {
        if (A == null) {
            return 0;
        }
        
        subtreeSums = new HashSet<>();
        
        // Post-order traversal to calculate subtree sums
        int allSum = postOrderTraversal(A);
        
        // If total sum is odd, can't partition equally
        if (allSum % 2 != 0) {
            return 0;
        }
        
        // Check if half the sum exists in any subtree
        int targetSum = allSum / 2;
        if (subtreeSums.contains(targetSum)) {
            return 1;
        }
        
        return 0;
    }
    
    // Post-order traversal to calculate subtree sums
    private int postOrderTraversal(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        int leftSum = postOrderTraversal(root.left);
        int rightSum = postOrderTraversal(root.right);
        
        // Store subtree sums (left and right subtrees)
        subtreeSums.add(leftSum);
        subtreeSums.add(rightSum);
        
        // Return total sum of current subtree
        return leftSum + rightSum + root.val;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


