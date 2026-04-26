/**
 * AniList GraphQL Service
 * Handles data fetching for user watching and completed anime lists.
 */
const ANILIST_URL = "https://graphql.anilist.co";

const WATCHING_QUERY = `
query ($username: String) {
  MediaListCollection(userName: $username, type: ANIME, status_in: [CURRENT]) {
    lists {
      entries {
        progress
        media {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
            extraLarge
            color
          }
          episodes
          status
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
        }
      }
    }
  }
}
`;

const COMPLETED_QUERY = `
query ($username: String) {
  MediaListCollection(userName: $username, type: ANIME, status_in: [COMPLETED], forceSingleCompletedList: true) {
    lists {
      entries {
        completedAt {
          year
          month
          day
        }
        media {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
            extraLarge
            color
          }
          bannerImage
          description
          genres
          averageScore
          episodes
          status
        }
      }
    }
  }
}
`;

export interface AniListEntry {
  progress: number;
  media: {
    id: number;
    title: {
      romaji: string;
      english: string;
    };
    coverImage: {
      large: string;
      extraLarge: string;
      color: string;
    };
    episodes: number;
    status: string;
    nextAiringEpisode: {
      episode: number;
      timeUntilAiring: number;
    } | null;
  };
}

export async function fetchWatching(username: string): Promise<AniListEntry[]> {
  // Avoid fetching for placeholder username
  if (!username || username === "[yourusername]") {
    return [];
  }

  try {
    const response = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: WATCHING_QUERY,
        variables: { username },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      console.error("AniList API Error:", JSON.stringify(data.errors, null, 2));
      return [];
    }

    // Handle case where MediaListCollection is null (username not found)
    if (!data.data || !data.data.MediaListCollection) {
      console.warn("AniList: No collection found for username:", username);
      return [];
    }

    // Flatten lists entries
    const entries = data.data.MediaListCollection.lists.flatMap(
      (list: any) => list.entries
    );
    return entries;
  } catch (error) {
    console.error("Failed to fetch AniList data:", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchCompleted(username: string): Promise<any[]> {
  // Avoid fetching for placeholder username
  if (!username || username === "[yourusername]") {
    return [];
  }

  try {
    const response = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: COMPLETED_QUERY,
        variables: { username },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      console.error("AniList API Error:", JSON.stringify(data.errors, null, 2));
      return [];
    }

    if (!data.data || !data.data.MediaListCollection) {
      console.warn("AniList: No collection found for username:", username);
      return [];
    }

    const entries = data.data.MediaListCollection.lists.flatMap(
      (list: any) => list.entries
    );
    
    // Sort by completion date (descending)
    return entries.sort((a: any, b: any) => {
      const dateA = new Date(a.completedAt.year || 0, (a.completedAt.month || 1) - 1, a.completedAt.day || 1).getTime();
      const dateB = new Date(b.completedAt.year || 0, (b.completedAt.month || 1) - 1, b.completedAt.day || 1).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Failed to fetch completed AniList data:", error instanceof Error ? error.message : error);
    return [];
  }
}
