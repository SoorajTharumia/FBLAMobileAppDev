export const getTwitterData = async () => {
    const api = {
      key: "OJm7lolJQDSLmVupvBcSbWNmt",
      secretKey: "UvwinLTz8c7mAYXI3Zc8vBYafkrua6mOvJiYr0yuYkNpcDVmYD",
      bearerToken:
        "AAAAAAAAAAAAAAAAAAAAAB85jwEAAAAAINE3yXB5FwihQVWYv%2B%2BhcIE%2FEPQ%3Ddwhvx9KOSNLxzPvaqcFsUfEcWFqCgG1V6pn8zZq5ugVZ122sXb",
    };

    const data = await fetch(
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
