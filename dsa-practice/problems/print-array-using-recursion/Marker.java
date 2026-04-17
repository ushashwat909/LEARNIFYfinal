import java.util.*;
class Marker {
    // Returns a string with array elements space-separated, followed by a newline
    public String PrintArray(int[] A) {
        StringBuilder sb = new StringBuilder();
        printHelper(A, 0, sb);
        sb.append("\n");
        return sb.toString();
    }
    
    private void printHelper(int[] A, int idx, StringBuilder sb) {
        if (idx == A.length) {
            return;
        }
        sb.append(A[idx]).append(" ");
        printHelper(A, idx + 1, sb);
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, String output) {
        String expected = PrintArray(A);
        return expected.equals(output);
    }
}





