export const algorithms = ["Selection Sort","Bubble Sort"] as const;
export type Algorithm = typeof algorithms[number]