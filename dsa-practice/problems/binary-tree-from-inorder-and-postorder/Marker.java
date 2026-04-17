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
    // Build binary tree from inorder and postorder traversals
    public TreeNode buildTree(int[] A, int[] B) {
        // Create hashmap to store index of each element in inorder array
        Map<Integer, Integer> hm = new HashMap<>();
        for (int i = 0; i < A.length; i++) {
            hm.put(A[i], i);
        }
        
        return buildTreeHelper(A, B, 0, A.length - 1, 0, B.length - 1, hm);
    }
    
    // Helper function to build tree recursively
    // ins, ine: start and end indices in inorder array
    // ps, pe: start and end indices in postorder array
    private TreeNode buildTreeHelper(int[] inorder, int[] postorder, 
                                     int ins, int ine, int ps, int pe, 
                                     Map<Integer, Integer> hm) {
        if (ins > ine || ps > pe) {
            return null;
        }
        
        // Root is always the last element in postorder
        TreeNode root = new TreeNode(postorder[pe]);
        
        // Find root's position in inorder array
        int rootIdx = hm.get(postorder[pe]);
        
        // Calculate length of left subtree
        int length = rootIdx - ins;
        
        // Build left subtree
        root.left = buildTreeHelper(inorder, postorder, 
                                   ins, rootIdx - 1, 
                                   ps, ps + length - 1, 
                                   hm);
        
        // Build right subtree
        root.right = buildTreeHelper(inorder, postorder, 
                                    rootIdx + 1, ine, 
                                    ps + length, pe - 1, 
                                    hm);
        
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
    public boolean isCorrect(int[] A, int[] B, TreeNode output) {
        TreeNode expected = buildTree(A.clone(), B.clone());
        return isSameTree(expected, output);
    }
}

