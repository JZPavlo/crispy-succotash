import {faker} from '@faker-js/faker';

const xmlTemplate = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>My RSS Feed</title>
            <link>http://example.com</link>
            <description>A sample RSS feed</description>
            <item>
                <title>Article 1</title>
                <link>http://example.com/article1</link>
                <description>This is the first article in my RSS feed</description>
            </item>
            <item>
                <title>Article 2</title>
                <link>http://example.com/article2</link>
                <description>This is the second article in my RSS feed</description>
            </item>
        </channel>
    </rss>
`;

export function generateRandomUrl() {
    const baseUrl = 'https://example.com/';
    const randomSlug = faker.lorem.slug();
    const rssUrl = `${baseUrl}${randomSlug}.xml`; // Append ".xml" to the slug to indicate RSS feed
    return rssUrl;
}

export function generateRandomUsername() {
    return faker.name.firstName();
}

export function generateRandomPassword() {
    return faker.internet.password(20, true, /[A-Z]/, '#');
}
