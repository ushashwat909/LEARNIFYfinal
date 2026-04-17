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

// Helper class to store node with its vertical index
class NodeWithIndex {
    TreeNode node;
    int index;
    
    NodeWithIndex(TreeNode node, int index) {
        this.node = node;
        this.index = index;
    }
}

class Marker {
    // Vertical Order Traversal - returns 2D list grouped by vertical index
    public List<List<Integer>> verticalOrderTraversal(TreeNode A) {
        if (A == null) {
            return new ArrayList<>();
        }
        
        Queue<NodeWithIndex> queue = new LinkedList<>();
        Map<Integer, List<Integer>> hm = new HashMap<>();
        
        // Start BFS with root at vertical index 0
        queue.add(new NodeWithIndex(A, 0));
        
        while (!queue.isEmpty()) {
            NodeWithIndex current = queue.poll();
            TreeNode node = current.node;
            int idx = current.index;
            
            // Add node value to its vertical index group
            if (hm.containsKey(idx)) {
                hm.get(idx).add(node.val);
            } else {
                List<Integer> list = new ArrayList<>();
                list.add(node.val);
                hm.put(idx, list);
            }
            
            // Add left child with index-1
            if (node.left != null) {
                queue.add(new NodeWithIndex(node.left, idx - 1));
            }
            
            // Add right child with index+1
            if (node.right != null) {
                queue.add(new NodeWithIndex(node.right, idx + 1));
            }
        }
        
        // Find min and max vertical indices
        int minKey = Integer.MAX_VALUE;
        int maxKey = Integer.MIN_VALUE;
        for (int key : hm.keySet()) {
            minKey = Math.min(minKey, key);
            maxKey = Math.max(maxKey, key);
        }
        
        // Build result list from min to max vertical index
        List<List<Integer>> ans = new ArrayList<>();
        for (int i = minKey; i <= maxKey; i++) {
            if (hm.containsKey(i)) {
                ans.add(hm.get(i));
            }
        }
        
        return ans;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(TreeNode A, List<List<Integer>> output) {
        List<List<Integer>> expected = verticalOrderTraversal(A);
        
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

