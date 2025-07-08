import axios from "axios";

export const fetchTrendingTopics = async () => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);

        const topics = data.articles
            .map(article => article.title.split(" ")[0])  // Grab first word from headline
            .filter(Boolean)
            .slice(0, 5);

        console.log("Fetched Topics from NewsAPI:", topics);

        return topics;
    } catch (error) {
        console.error("Failed to fetch topics from NewsAPI:", error);
        return [];
    }
};
