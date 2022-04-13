import axios from 'axios';

export async function getLocalContent({page = 1, pageSize = 10 }) {
    // const cleanQueries = queries.length > 1 ? queries.join('%2C') : queries[0];
    // const cleanTags = tags.length > 1 ? tags.join('%2C') : tags.length === 1 ? tags[0] : false;

    const response = await axios(
        `https://content.guardianapis.com/search?show-fields=all&page=${page}&page-size=${pageSize}&q=Uganda&api-key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    if (response.status !== 200) throw new Error();
    const data = response.data.response.results;
    console.log(data);
    return data;
}

export async function getInternationalContent({page = 1, pageSize = 10 }) {
    // const cleanQueries = queries.length > 1 ? queries.join('%2C') : queries[0];
    // const cleanTags = tags.length > 1 ? tags.join('%2C') : tags.length === 1 ? tags[0] : false;

    const response = await axios(
        `https://content.guardianapis.com/search?show-fields=all&page=${page}&page-size=${pageSize}&q=International&api-key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    if (response.status !== 200) throw new Error();
    const data = response.data.response.results;
    return data;
}