import { OriginalWork } from "../types";

// TODO: Replace mock data with actual API call
const MOCK_ORIGINAL_WORK: OriginalWork = {
  title: "Here Comes the Sun",
  isrc: "GBAYE0601696",
  composersAndWriters: ["John Lennon", "Paul McCartney"],
  musicArrangers: ["George Martin"],
  lyricists: ["John Lennon", "Paul McCartney"],
};

/**
 * Fetches original work data based on a provided link
 * @param link - URL or link to the original work
 * @returns Promise with the original work data
 */
export async function fetchOriginalWorkData(link: string): Promise<OriginalWork> {
  // Simulate getting data based on the link
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: Replace with actual API call
      resolve(MOCK_ORIGINAL_WORK);
    }, 1000);
  });
}

/**
 * Sends cover number information to NMP system
 * @param data - The cover number information to submit
 * @returns Promise indicating success or failure
 */
export async function sendInfoToNMP(data: unknown): Promise<{ success: boolean }> {
  // Simulate sending data to NMP
  return new Promise((resolve, reject) => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
}
