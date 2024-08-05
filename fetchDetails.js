const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

async function fetchDetails(anime, channel) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${anime}`);
        const data = response.data.data[0];

        if (!data) {
            throw new Error('No anime data found');
        }

        const genresString = (data.genres && Array.isArray(data.genres))
            ? data.genres.map(item => item.name).join(', ')
            : 'N/A';

        const themesString = (data.themes && Array.isArray(data.themes))
            ? data.themes.map(item => item.name).join(', ')
            : 'N/A';

        const studioName = (data.studios && Array.isArray(data.studios) && data.studios.length > 0)
            ? data.studios[0].name
            : 'N/A';

        const content = 
            `**[Check on MyAnimeList](${data.url})**\n\n` + `**Title**: ${data.title_japanese || 'N/A'} [${data.title}]\n` +
            `**Episodes**: ${data.episodes || 'N/A'}\n` +
            `**Type**: ${data.type || 'N/A'}\n` +
            `**Source**: ${data.source || 'N/A'}\n` +
            `**Status**: ${data.status || 'N/A'}\n` +
            `**Aired**: ${data.aired ? data.aired.from.split('T')[0] : 'N/A'} to ${data.aired ? data.aired.to.split('T')[0] : 'N/A'}\n` +
            `**Duration**: ${data.duration || 'N/A'}\n` +
            `**Rating**: ${data.rating || 'N/A'}\n` +
            `**Score**: ${data.score || 'N/A'} (${data.scored_by || 'N/A'})\n` +
            `**Genre(s)**: ${genresString}\n` +
            `**Theme(s)**: ${themesString}\n` +
            `**Studio**: ${studioName}\n`;

        const trailerEmbed = new EmbedBuilder()
            .setColor('#ff3300')
            .setTitle(`${data.titles[0]?.title?.toString()} [${data.titles[1]?.title?.toString()}]`)
            .setURL(data.trailer?.embed_url || 'https://www.youtube.com')
            .setAuthor({
                name: 'Watch Trailer',
                iconURL: data.trailer?.images?.image_url || '',
                url: data.trailer?.embed_url || 'https://www.youtube.com'
            })
            .setImage(data.trailer?.images?.maximum_image_url || data.trailer?.images?.image_url)
            .setTimestamp();

        return({ content, embeds: [trailerEmbed] });

    } catch (error) {
        console.error('Error fetching details:', error);
        await channel.send('Error fetching anime details.');
    }
}

module.exports = fetchDetails;
