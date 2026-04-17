import java.util.*;

class Marker {
    private int[] parent;
    private int[] rank;
    
    // Find function with path compression
    private int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    // Union function with rank optimization
    private void union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }
    
    // Find minimum cost to connect all islands using Kruskal's algorithm
    public int solve(int A, int[][] B) {
        // Sort edges by weight
        Arrays.sort(B, (a, b) -> Integer.compare(a[2], b[2]));
        
        // Initialize Union-Find structures
        parent = new int[A + 1];
        rank = new int[A + 1];
        for (int i = 1; i <= A; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
        
        // Kruskal's Algorithm
        int mstCost = 0;
        int edgesUsed = 0;
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            int cost = edge[2];
            
            // If adding this edge doesn't form a cycle
            if (find(u) != find(v)) {
                union(u, v);
                mstCost += cost;
                edgesUsed++;
                
                // Stop early if we already used (A-1) edges
                if (edgesUsed == A - 1) {
                    break;
                }
            }
        }
        
        return mstCost;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

