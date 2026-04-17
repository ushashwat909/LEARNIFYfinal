import java.util.*;

class Marker {
    private List<List<Integer>> graph;
    private boolean[] visited;
    private boolean[] path;
    
    // Check if cycle exists in directed graph using DFS
    public int solve(int A, int[][] B) {
        // Build adjacency list
        graph = new ArrayList<>();
        for (int i = 0; i <= A; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            graph.get(u).add(v);
        }
        
        // Initialize visited and path arrays
        visited = new boolean[A + 1];
        path = new boolean[A + 1];
        
        // Check all nodes in case of disconnected components
        for (int i = 1; i <= A; i++) {
            if (!visited[i]) {
                if (dfs(i)) {
                    return 1; // Cycle detected
                }
            }
        }
        
        return 0; // No cycle detected
    }
    
    private boolean dfs(int node) {
        if (!visited[node]) {
            visited[node] = true;
            path[node] = true; // Add to recursion stack
            
            for (int neighbor : graph.get(node)) {
                if (!visited[neighbor]) {
                    if (dfs(neighbor)) { // If unvisited, recurse
                        return true;
                    }
                } else if (path[neighbor]) { // If already in recursion stack, cycle found
                    return true;
                }
            }
            
            path[node] = false; // Remove from recursion stack
        }
        return false;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

