import java.util.*;

class Marker {
    // Check if path exists from node 1 to node A using BFS
    public int solve(int A, int[][] B) {
        // Build adjacency list
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= A; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            graph.get(u).add(v);
        }
        
        // BFS from node 1
        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        
        queue.offer(1);
        visited.add(1);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            if (node == A) {
                return 1; // Target found
            }
            
            for (int neighbor : graph.get(node)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return 0; // Target not reachable
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

