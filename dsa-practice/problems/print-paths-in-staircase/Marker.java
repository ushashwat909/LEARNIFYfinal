import java.util.*;
class Marker {
    // Generate all distinct ways to climb staircase using backtracking
    public List<List<Integer>> WaysToClimb(int A) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        backtrack(0, A, path, result);
        return result;
    }
    
    private void backtrack(int steps, int target, List<Integer> path, List<List<Integer>> result) {
        // Base case: reached the top
        if (steps == target) {
            result.add(new ArrayList<>(path));
            return;
        }
        
        // Base case: exceeded the target (invalid path)
        if (steps > target) {
            return;
        }
        
        // Try climbing 1 step
        path.add(1);
        backtrack(steps + 1, target, path, result);
        path.remove(path.size() - 1); // Backtrack
        
        // Try climbing 2 steps
        path.add(2);
        backtrack(steps + 2, target, path, result);
        path.remove(path.size() - 1); // Backtrack
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, List<List<Integer>> output) {
        List<List<Integer>> expected = WaysToClimb(A);
        
        // Sort both lists for comparison (since order doesn't matter, but we'll sort to be safe)
        sortListOfLists(expected);
        List<List<Integer>> outputCopy = new ArrayList<>();
        for (List<Integer> list : output) {
            outputCopy.add(new ArrayList<>(list));
        }
        sortListOfLists(outputCopy);
        
        if (expected.size() != outputCopy.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            if (!expected.get(i).equals(outputCopy.get(i))) {
                return false;
            }
        }
        
        return true;
    }
    
    private void sortListOfLists(List<List<Integer>> list) {
        Collections.sort(list, (a, b) -> {
            for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
                int cmp = Integer.compare(a.get(i), b.get(i));
                if (cmp != 0) return cmp;
            }
            return Integer.compare(a.size(), b.size());
        });
    }
}

