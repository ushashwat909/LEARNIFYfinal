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
    // Search for value B in Binary Search Tree (iterative approach)
    public int solve(TreeNode A, int B) {
        TreeNode temp = A;
        
        while (temp != null) {
            if (temp.val == B) {
                return 1; // Found
            } else if (temp.val < B) {
                // Value is greater, search in right subtree
                temp = temp.right;
            } else {
                // Value is smaller, search in left subtree
                temp = temp.left;
            }
        }
        
        return 0; // Not found
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

