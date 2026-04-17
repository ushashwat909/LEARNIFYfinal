import java.util.*;
class Marker {
    // Returns 1 if string A is a palindrome, 0 otherwise
    public int solve(String A) {
        return checkPalindrome(A, 0, A.length() - 1);
    }
    
    private int checkPalindrome(String A, int i, int j) {
        if (i >= j) {
            return 1;
        }
        if (A.charAt(i) != A.charAt(j)) {
            return 0;
        }
        return checkPalindrome(A, i + 1, j - 1);
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





