import axios from 'axios';

export async function getContent({queries = ['Uganda'], tags = [''], page = 1, pageSize = 10 }){
    const cleanQueries = queries.length > 1 ? queries.join('%2C') : queries[0];
    const cleanTags = tags.length > 1 ? tags.join('%2C') : tags.length === 1 ? tags[0] : null;

    const response = await axios({url: `https://content.guardianapis.com/search?${tags && "tag="+cleanTags}&show-fields=all&order-by=newest&page=${page}&page-size=${pageSize}&q=${cleanQueries}&api-key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`});
    if (response.status !== 200) throw new Error();
    const data = response;
    console.log(data);
    
}