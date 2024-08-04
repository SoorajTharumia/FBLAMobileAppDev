require('dotenv').config(); //importing .env

export const getTwitterData = async () => {
    const api = {
        key: process.env.TWITTER_API_KEY,
        secretKey: process.env.TWITTER_SECRET_KEY,
        bearerToken: process.env.TWITTER_BEARER_TOKEN,
    };

    const data = await fetch(
        // Twitter api link to fetch from PSD twitter account
        "https://api.twitter.com/2/users/526262593/tweets?tweet.fields=lang&expansions=attachments.media_keys&media.fields=preview_image_url,url",
        
        {
            headers: {
                Authorization: `Bearer ${api.bearerToken}`,
            },
        }
    )
        .then((res) => res.json())
    const tweets = data.data;
    const photos = data.includes.media;
    return { tweets, photos };
}

export const getCalendarData = async () => {
    const data = await fetch("https://638500764ce192ac6069e674.mockapi.io/events/1")
        .then((res) => res.json())
    
    const events = data.eventsarray;
    return { events };
}
