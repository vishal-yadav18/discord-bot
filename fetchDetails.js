const axios = require('axios');

async function fetchDetails(anime) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${anime}`);
        const data = response.data.data[0];

        const genresString = (data.genres && Array.isArray(data.genres))
            ? data.genres.map(item => item.name).join(', ')
            : 'N/A';

        const themesString = (data.themes && Array.isArray(data.themes))
        ? data.themes.map(item => item.name).join(', ')
        : 'N/A';

        const studioName = (data.studios && Array.isArray(data.studios) && data.studios.length > 0)
            ? data.studios[0].name
            : 'N/A';

        // Build content string
        const content = 
        `${data.url}\n**Title** : ${data.title_japanese || 'N/A'} [${data.title}]\n**Episodes**: ${data.episodes || 'N/A'}\n**Type**: ${data.type || 'N/A'}\n**Source**: ${data.source || 'N/A'}\n**Status**: ${data.status || 'N/A'}\n**Aired**: ${data.aired ? data.aired.from.split('T')[0] : 'N/A'} to ${data.aired ? data.aired.to.split('T')[0] : 'N/A'}\n**Duration**: ${data.duration || 'N/A'}\n**Rating**: ${data.rating || 'N/A'}\n**Score**: ${data.score || 'N/A'} (${data.scored_by || 'N/A'})\n**Genre(s)**: ${genresString}\n**Theme(s)**: ${themesString}\n**Studio**: ${studioName}
        `;

        return content;
    } catch (error) {
        console.error('Error fetching details:', error);
        return 'Error fetching anime details.';
    }
}

module.exports = fetchDetails;
