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
    // Preorder Traversal: Root -> Left -> Right
    public int[] preorderTraversal(TreeNode A) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(A, result);
        
        // Convert List to array
        int[] ans = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            ans[i] = result.get(i);
        }
        return ans;
    }
    
    // Helper method for recursive preorder traversal
    private void preorderHelper(TreeNode root, List<Integer> result) {
        if (root == null) {
            return;
        }
        
        // Visit root
        result.add(root.val);
        
        // Traverse left subtree
        preorderHelper(root.left, result);
        
        // Traverse right subtree
        preorderHelper(root.right, result);
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int[] output) {
        int[] expected = preorderTraversal(A);
        
        if (expected.length != output.length) {
            return false;
        }
        
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        
        return true;
    }
}

