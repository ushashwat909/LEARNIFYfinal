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
    // Morris Inorder Traversal - O(n) time, O(1) space
    public int[] solve(TreeNode A) {
        List<Integer> ans = new ArrayList<>();
        TreeNode cur = A;
        
        while (cur != null) {
            if (cur.left != null) {
                // Find the rightmost node in the left subtree (inorder predecessor)
                TreeNode pred = cur.left;
                while (pred.right != null && pred.right != cur) {
                    pred = pred.right;
                }
                
                if (pred.right == null) {
                    // Create thread: make predecessor point to current node
                    pred.right = cur;
                    cur = cur.left;
                } else {
                    // Thread already exists, remove it and visit current node
                    pred.right = null;
                    ans.add(cur.val);
                    cur = cur.right;
                }
            } else {
                // No left child, visit current node and go right
                ans.add(cur.val);
                cur = cur.right;
            }
        }
        
        // Convert List to array
        int[] result = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }
        return result;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int[] output) {
        int[] expected = solve(A);
        
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


