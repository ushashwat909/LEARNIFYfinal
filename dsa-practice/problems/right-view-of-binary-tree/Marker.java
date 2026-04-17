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
    // Right View of Binary Tree - returns rightmost node at each level
    public int[] solve(TreeNode A) {
        if (A == null) {
            return new int[0];
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> levels = new ArrayList<>();
        List<Integer> level = new ArrayList<>();
        
        queue.add(A);
        queue.add(null); // Delimiter to separate levels
        
        while (!queue.isEmpty()) {
            TreeNode x = queue.poll();
            
            // If we've processed all nodes and queue is empty, add last level and break
            if (x == null && queue.isEmpty()) {
                levels.add(level);
                break;
            }
            
            // If we hit delimiter, add current level to result and start new level
            if (x == null) {
                levels.add(level);
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
        
        // Extract the rightmost node (last element) from each level
        List<Integer> result = new ArrayList<>();
        for (List<Integer> lvl : levels) {
            if (!lvl.isEmpty()) {
                result.add(lvl.get(lvl.size() - 1));
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

