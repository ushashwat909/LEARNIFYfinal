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
    // Level Order Traversal (BFS) - returns 2D list where each inner list is a level
    public List<List<Integer>> solve(TreeNode A) {
        List<List<Integer>> ans = new ArrayList<>();
        if (A == null) {
            return ans;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        List<Integer> level = new ArrayList<>();
        
        queue.add(A);
        queue.add(null); // Delimiter to separate levels
        
        while (!queue.isEmpty()) {
            TreeNode x = queue.poll();
            
            // If we've processed all nodes and queue is empty, add last level and break
            if (x == null && queue.isEmpty()) {
                ans.add(level);
                break;
            }
            
            // If we hit delimiter, add current level to result and start new level
            if (x == null) {
                ans.add(level);
                level = new ArrayList<>();
                queue.add(null); // Add delimiter for next level
            } else {
                // Add current node's value to current level
                level.add(x.val);
                
                // Add children to queue
                if (x.left != null) {
                    queue.add(x.left);
                }
                if (x.right != null) {
                    queue.add(x.right);
                }
            }
        }
        
        return ans;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, List<List<Integer>> output) {
        List<List<Integer>> expected = solve(A);
        
        if (expected.size() != output.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            List<Integer> expLevel = expected.get(i);
            List<Integer> outLevel = output.get(i);
            
            if (expLevel.size() != outLevel.size()) {
                return false;
            }
            
            for (int j = 0; j < expLevel.size(); j++) {
                if (!expLevel.get(j).equals(outLevel.get(j))) {
                    return false;
                }
            }
        }
        
        return true;
    }
}

