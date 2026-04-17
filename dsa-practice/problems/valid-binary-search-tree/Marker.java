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
    // Check if binary tree is a valid BST using inorder traversal
    public int isValidBST(TreeNode A) {
        List<Integer> inorder = new ArrayList<>();
        inorderTraversal(A, inorder);
        
        // Check if inorder traversal is strictly increasing
        for (int i = 1; i < inorder.size(); i++) {
            if (inorder.get(i) <= inorder.get(i - 1)) {
                return 0; // Not a valid BST
            }
        }
        
        return 1; // Valid BST
    }
    
    // Helper method to perform inorder traversal
    private void inorderTraversal(TreeNode root, List<Integer> result) {
        if (root == null) {
            return;
        }
        
        // Traverse left subtree
        inorderTraversal(root.left, result);
        
        // Visit root
        result.add(root.val);
        
        // Traverse right subtree
        inorderTraversal(root.right, result);
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int output) {
        int expected = isValidBST(A);
        return expected == output;
    }
}

