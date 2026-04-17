import java.util.*;

class Marker {
    // Check if it's possible to finish all courses using Kahn's algorithm
    public int solve(int A, int[] B, int[] C) {
        // Build the graph and calculate in-degrees
        List<List<Integer>> graph = new ArrayList<>();
        int[] inDegree = new int[A + 1]; // 1-based indexing
        
        for (int i = 0; i <= A; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int i = 0; i < B.length; i++) {
            int u = B[i];
            int v = C[i];
            graph.get(u).add(v);
            inDegree[v]++;
        }
        
        // Initialize queue with nodes having in-degree 0
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i <= A; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // Perform Kahn's Algorithm for Topological Sorting
        int count = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            count++;
            
            // Process all neighbors
            for (int neighbor : graph.get(course)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        // Check if all nodes are processed
        return (count == A) ? 1 : 0;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[] B, int[] C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

