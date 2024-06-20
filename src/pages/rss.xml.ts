import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

import { SITE } from "../config";

const parser = new MarkdownIt();

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const items = posts
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))
    .map(({ data, slug, body }) => ({
      link: slug,
      title: data.title,
      description: data.description,
      pubDate: data.pubDate,
      content: sanitizeHtml(
        parser.render(body),
        {
          allowedTags: [
            'img',
            'a',
            'p',
            'strong',
            'b',
            'i',
            'em',
            'hr',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
          ]
        }
      ),
    }));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    items,
  });
}