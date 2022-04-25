export default class StoryService {
    _apiBase = "https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories";

    _getResources = async (url) => {
        const res = await fetch(`${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}` + `, received ${res.status}`);
        }

        return await res.json();
    };

    getAllStories = async () => {
        return await this._getResources(this._apiBase);
    };

    getMoreStories = async (language, order, nextPageToken) => {
        const res = await this._getResources(`${this._apiBase}?limit=20&languages=${language},fr&order=${order}&page_token=${nextPageToken}`);
        return res;
    };

    filterStories = async (language, order) => {
        const res = await this._getResources(`${this._apiBase}?limit=20&languages=${language},fr&order=${order}`);
        return await res;
    };

}