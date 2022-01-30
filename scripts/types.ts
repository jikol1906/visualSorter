export const algorithms = ["Selection Sort","Bubble Sort","Insertion Sort"] as const;
export type Algorithm = typeof algorithms[number]