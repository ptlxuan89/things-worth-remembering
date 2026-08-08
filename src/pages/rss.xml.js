import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: 'things worth remembering',
    description:
      'Building AI products, collecting lessons, and staying curious about people, technology, and life. By xưn.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/things-worth-remembering/posts/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
  });
}
