import java.util.*;

class Marker {
    public int solve(int[] A) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        
        // Add all ropes to the min heap
        for (int rope : A) {
            pq.offer(rope);
        }
        
        int cost = 0;
        
        // Continue until only one rope remains
        while (pq.size() > 1) {
            // Get the two shortest ropes
            int a = pq.poll();
            int b = pq.poll();
            
            // Cost of connecting these two ropes
            int connectCost = a + b;
            cost += connectCost;
            
            // Add the connected rope back to the heap
            pq.offer(connectCost);
        }
        
        return cost;
    }

    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


