import java.util.*;

class Marker {
    // Find shortest distance using 0-1 BFS
    public int solve(int A, int[][] B, int C, int D) {
        // Build adjacency list
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < A; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            adj.get(u).add(new int[]{v, w});
            adj.get(v).add(new int[]{u, w});
        }
        
        // Initialize distance array
        int[] dist = new int[A];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[C] = 0;
        
        // Use ArrayDeque for 0-1 BFS
        Deque<Integer> dq = new ArrayDeque<>();
        dq.offer(C);
        
        // Perform 0-1 BFS
        while (!dq.isEmpty()) {
            int node = dq.pollFirst();
            
            for (int[] neighbor : adj.get(node)) {
                int neighborNode = neighbor[0];
                int weight = neighbor[1];
                int newDist = dist[node] + weight;
                
                if (newDist < dist[neighborNode]) {
                    dist[neighborNode] = newDist;
                    if (weight == 1) {
                        dq.offerFirst(neighborNode); // Priority for weight 1
                    } else {
                        dq.offerLast(neighborNode); // Add weight 2 at the end
                    }
                }
            }
        }
        
        // Return the result
        return (dist[D] != Integer.MAX_VALUE) ? dist[D] : -1;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int C, int D, int output) {
        int expected = solve(A, B, C, D);
        return expected == output;
    }
}

