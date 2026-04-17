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
    // Find the kth smallest element in BST using iterative inorder traversal
    public int kthsmallest(TreeNode A, int B) {
        int cnt = 0;
        Stack<TreeNode> st = new Stack<>();
        
        while (!st.isEmpty() || A != null) {
            if (A != null) {
                st.push(A);
                A = A.left;
            } else {
                A = st.pop();
                cnt++;
                if (cnt == B) {
                    return A.val;
                }
                A = A.right;
            }
        }
        
        // Should not reach here if B is valid, but return -1 as fallback
        return -1;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, int B, int output) {
        int expected = kthsmallest(A, B);
        return expected == output;
    }
}


