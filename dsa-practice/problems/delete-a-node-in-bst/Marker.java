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
    // Delete node with value B from BST
    public TreeNode solve(TreeNode A, int B) {
        return deleteNode(A, B);
    }
    
    // Helper method to delete node recursively
    private TreeNode deleteNode(TreeNode root, int B) {
        if (root == null) {
            return null;
        }
        
        // Search for the node to delete
        if (root.val < B) {
            // Value is greater, search in right subtree
            root.right = deleteNode(root.right, B);
        } else if (root.val > B) {
            // Value is smaller, search in left subtree
            root.left = deleteNode(root.left, B);
        } else {
            // Node to delete found
            // Case 1: Node has no children
            if (root.left == null && root.right == null) {
                return null;
            }
            // Case 2: Node has only right child
            else if (root.left == null) {
                return root.right;
            }
            // Case 3: Node has only left child
            else if (root.right == null) {
                return root.left;
            }
            // Case 4: Node has two children
            else {
                // Find in-order predecessor (rightmost node in left subtree)
                TreeNode temp = root.left;
                while (temp.right != null) {
                    temp = temp.right;
                }
                
                // Replace root's value with predecessor's value
                int rootVal = root.val;
                root.val = temp.val;
                temp.val = rootVal;
                
                // Delete the predecessor node
                root.left = deleteNode(root.left, B);
            }
        }
        
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
    public boolean isCorrect(TreeNode A, int B, TreeNode output) {
        TreeNode expected = solve(A, B);
        return isSameTree(expected, output);
    }
}

