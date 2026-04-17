// Definition for a binary tree node with next pointer
class TreeLinkNode {
    int val;
    TreeLinkNode left;
    TreeLinkNode right;
    TreeLinkNode next;
    TreeLinkNode(int x) { 
        val = x; 
        left = null;
        right = null;
        next = null;
    }
}

class Marker {
    // Connect nodes at the same level using next pointers
    public TreeLinkNode connect(TreeLinkNode A) {
        if (A == null) {
            return A;
        }
        
        TreeLinkNode root = A;
        TreeLinkNode dummy = new TreeLinkNode(-1);
        TreeLinkNode temp = dummy;
        
        while (root != null) {
            // Connect left child if exists
            if (root.left != null) {
                temp.next = root.left;
                temp = temp.next;
            }
            
            // Connect right child if exists
            if (root.right != null) {
                temp.next = root.right;
                temp = temp.next;
            }
            
            // Move to next node in current level
            root = root.next;
            
            // If we've finished current level, move to next level
            if (root == null) {
                root = dummy.next;
                dummy.next = null;
                temp = dummy;
            }
        }
        
        return A;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeLinkNode A, TreeLinkNode output) {
        // Clone the tree to avoid modifying the original
        TreeLinkNode AClone = cloneTree(A);
        TreeLinkNode expected = connect(AClone);
        
        // Compare next pointers level by level
        return compareNextPointers(expected, output);
    }
    
    // Clone a tree (without next pointers)
    private TreeLinkNode cloneTree(TreeLinkNode root) {
        if (root == null) {
            return null;
        }
        TreeLinkNode newNode = new TreeLinkNode(root.val);
        newNode.left = cloneTree(root.left);
        newNode.right = cloneTree(root.right);
        newNode.next = null; // Reset next pointer
        return newNode;
    }
    
    // Compare next pointers of two trees
    private boolean compareNextPointers(TreeLinkNode expected, TreeLinkNode output) {
        if (expected == null && output == null) {
            return true;
        }
        if (expected == null || output == null) {
            return false;
        }
        
        TreeLinkNode expLevel = expected;
        TreeLinkNode outLevel = output;
        
        while (expLevel != null && outLevel != null) {
            TreeLinkNode expCur = expLevel;
            TreeLinkNode outCur = outLevel;
            TreeLinkNode expNextLevel = null;
            TreeLinkNode outNextLevel = null;
            
            while (expCur != null && outCur != null) {
                if (expCur.val != outCur.val) {
                    return false;
                }
                
                // Check next pointer
                if (expCur.next == null && outCur.next != null) {
                    return false;
                }
                if (expCur.next != null && outCur.next == null) {
                    return false;
                }
                if (expCur.next != null && outCur.next != null) {
                    if (expCur.next.val != outCur.next.val) {
                        return false;
                    }
                }
                
                // Track start of next level
                if (expNextLevel == null && expCur.left != null) {
                    expNextLevel = expCur.left;
                }
                if (outNextLevel == null && outCur.left != null) {
                    outNextLevel = outCur.left;
                }
                
                expCur = expCur.next;
                outCur = outCur.next;
            }
            
            // Both should be null at the same time
            if (expCur != null || outCur != null) {
                return false;
            }
            
            expLevel = expNextLevel;
            outLevel = outNextLevel;
        }
        
        return expLevel == null && outLevel == null;
    }
}

