import java.util.*;

class Marker {
    // Find topological ordering using Kahn's algorithm with min-heap
    public int[] solve(int A, int[][] B) {
        // Build the graph and calculate in-degrees
        List<List<Integer>> graph = new ArrayList<>();
        int[] inDegree = new int[A + 1]; // 1-based indexing
        
        for (int i = 0; i <= A; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            graph.get(u).add(v);
            inDegree[v]++;
        }
        
        // Use a min-heap for lexicographical order
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int i = 1; i <= A; i++) {
            if (inDegree[i] == 0) {
                minHeap.offer(i);
            }
        }
        
        // Perform Kahn's Algorithm
        List<Integer> topoOrder = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            int node = minHeap.poll();
            topoOrder.add(node);
            
            for (int neighbor : graph.get(node)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    minHeap.offer(neighbor);
                }
            }
        }
        
        // Check if all nodes are processed
        if (topoOrder.size() == A) {
            int[] result = new int[A];
            for (int i = 0; i < A; i++) {
                result[i] = topoOrder.get(i);
            }
            return result;
        } else {
            return new int[0]; // Empty array if cycle exists
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int[] output) {
        int[] expected = solve(A, B);
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

