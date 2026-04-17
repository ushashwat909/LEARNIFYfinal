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
    // Convert sorted array to balanced BST
    public TreeNode sortedArrayToBST(int[] A) {
        return buildTree(A, 0, A.length - 1);
    }
    
    // Helper method to build BST recursively
    private TreeNode buildTree(int[] A, int lo, int hi) {
        // Base case: empty subarray
        if (lo > hi) {
            return null;
        }
        
        // Base case: single element
        if (lo == hi) {
            return new TreeNode(A[lo]);
        }
        
        // Find middle element
        int mid = (lo + hi) / 2;
        
        // Create root with middle element
        TreeNode root = new TreeNode(A[mid]);
        
        // Recursively build left subtree from left half
        root.left = buildTree(A, lo, mid - 1);
        
        // Recursively build right subtree from right half
        root.right = buildTree(A, mid + 1, hi);
        
        return root;
    }
    
    // Compare two trees by checking if they have the same structure and values
    private boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        if (p.val != q.val) {
            return false;
        }
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    
    // Compare the output with expected result
    public boolean isCorrect(int[] A, TreeNode output) {
        TreeNode expected = sortedArrayToBST(A.clone());
        return isSameTree(expected, output);
    }
}

