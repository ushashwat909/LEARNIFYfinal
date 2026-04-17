import java.util.*;

class Marker {
    static class Item {
        int value;
        int weight;
        double valuePerWeight;
        
        Item(int value, int weight) {
            this.value = value;
            this.weight = weight;
            this.valuePerWeight = (double) value / weight;
        }
    }
    
    public int solve(int[] A, int[] B, int C) {
        int n = A.length;
        
        // Create a list of items with their value per weight ratio
        List<Item> items = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            items.add(new Item(A[i], B[i]));
        }
        
        // Sort items by value per weight in descending order
        items.sort((a, b) -> Double.compare(b.valuePerWeight, a.valuePerWeight));
        
        double maxValue = 0.0;
        int capacity = C;
        
        for (Item item : items) {
            if (capacity == 0) {
                break;
            }
            
            // Take as much as possible of the current item
            if (item.weight <= capacity) {
                maxValue += item.value;
                capacity -= item.weight;
            } else {
                maxValue += item.valuePerWeight * capacity;
                capacity = 0; // Knapsack is full
            }
        }
        
        // Multiply by 100 and return floor value
        // Adding small epsilon to avoid precision issues
        return (int) Math.floor(maxValue * 100 + 1e-9);
    }

    public boolean isCorrect(int[] A, int[] B, int C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

