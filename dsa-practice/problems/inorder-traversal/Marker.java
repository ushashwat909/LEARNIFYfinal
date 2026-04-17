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
    // Inorder Traversal: Left -> Root -> Right (iterative using stack)
    public int[] inorderTraversal(TreeNode A) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode temp = A;
        List<Integer> result = new ArrayList<>();
        
        while (temp != null || !stack.isEmpty()) {
            if (temp != null) {
                // Keep going left
                stack.push(temp);
                temp = temp.left;
            } else {
                // Pop from stack, add to result, go right
                TreeNode x = stack.pop();
                result.add(x.val);
                temp = x.right;
            }
        }
        
        // Convert List to array
        int[] ans = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            ans[i] = result.get(i);
        }
        return ans;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int[] output) {
        int[] expected = inorderTraversal(A);
        
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

