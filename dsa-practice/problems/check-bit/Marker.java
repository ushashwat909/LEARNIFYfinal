class Marker {
    public int solve(int A, int B) {
        if ((A & (1 << B)) != 0) {
            return 1;
        }
        return 0;
    }

    public boolean isCorrect(int A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





