import java.util.*;

class Marker {
    private static final int MOD = 1000000007;
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
    private boolean union(int x, int y) {
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
            return true;
        }
        return false;
    }
    
    // Find minimum construction cost using Kruskal's algorithm
    public int solve(int A, int[][] B) {
        // Sort edges by weight
        Arrays.sort(B, (a, b) -> Long.compare(a[2], b[2]));
        
        // Initialize Union-Find structures
        parent = new int[A + 1];
        rank = new int[A + 1];
        for (int i = 1; i <= A; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
        
        // Build MST
        long mstCost = 0;
        int edgesUsed = 0;
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            long cost = edge[2];
            
            // If the edge connects two different components
            if (union(u, v)) {
                mstCost = (mstCost + cost) % MOD;
                edgesUsed++;
                
                // Stop early if we already used (A-1) edges
                if (edgesUsed == A - 1) {
                    break;
                }
            }
        }
        
        // Return the total cost of MST modulo 10^9+7
        return (int) mstCost;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

