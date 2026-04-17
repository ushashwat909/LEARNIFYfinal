import java.util.*;
class Marker {
    // Generate all permutations using backtracking
    public List<List<Integer>> permute(int[] A) {
        List<List<Integer>> ans = new ArrayList<>();
        int n = A.length;
        dfs(A, 0, n, ans);
        return ans;
    }
    
    private void dfs(int[] A, int idx, int n, List<List<Integer>> ans) {
        if (idx == n - 1) {
            // Base case: reached the end, add current permutation
            List<Integer> perm = new ArrayList<>();
            for (int num : A) {
                perm.add(num);
            }
            ans.add(perm);
            return;
        }
        
        // Try all possibilities for position idx
        for (int i = idx; i < n; i++) {
            // Swap A[i] and A[idx]
            swap(A, i, idx);
            // Recursively generate permutations for remaining positions
            dfs(A, idx + 1, n, ans);
            // Backtrack: swap back to restore original state
            swap(A, i, idx);
        }
    }
    
    private void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, List<List<Integer>> output) {
        List<List<Integer>> expected = permute(A.clone());
        
        // Sort both lists for comparison (since order doesn't matter)
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

