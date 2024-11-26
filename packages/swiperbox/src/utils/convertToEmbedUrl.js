export function convertToEmbedUrl(url) {
    try {
        const urlObject = new URL(url);

        if (urlObject.hostname === "www.youtube.com" || urlObject.hostname === "youtube.com") {
            const videoId = urlObject.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } else if (urlObject.hostname === "youtu.be") {
            const videoId = urlObject.pathname.slice(1); // Remove the leading slash
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (urlObject.hostname === "vimeo.com") {
            const videoId = urlObject.pathname.slice(1); // Remove the leading slash
            return `https://player.vimeo.com/video/${videoId}`;
        }
    } catch (error) {
        console.error("Invalid URL:", error.message);
    }

    return url;
}