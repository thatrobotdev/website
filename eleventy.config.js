
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginNavigation from "@11ty/eleventy-navigation";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginDrafts from "./eleventy.config.drafts.js";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import _ from 'lodash';
import markdownItAnchor from "markdown-it-anchor";
import { DateTime } from "luxon";

export default (function (eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css",
		"/static/": "/",
	});
	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);

	// Official plugins
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);
	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "dd LLLL yyyy"
		);
	});
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});
	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}
		return array.slice(0, n);
	});
	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});
	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	// Filter out the tags we don't want to include in the tag list
	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(
			(tag) => ["all", "nav", "post", "posts", "projects"].indexOf(tag) === -1
		);
	});

	// year, year-month, and year-month-day indexes from Thomas Steiner: https://blog.tomayac.com/2024/11/02/eleventy-11ty-year-year-month-and-year-month-day-indexes/
	// Year collection
  eleventyConfig.addCollection('postsByYear', (collection) => {
    return _.chain(collection.getAllSorted())
      .filter((item) => 'tags' in item.data && item.data.tags.includes('posts'))
      .groupBy((post) => new Date(post.date.toUTCString()).getUTCFullYear())
      .toPairs()
      .reverse()
      .value();
	});

	// Year / Month collection
  eleventyConfig.addCollection('postsByYearMonth', (collection) => {
    return _.chain(collection.getAllSorted())
      .filter((item) => 'tags' in item.data && item.data.tags.includes('posts'))
			.groupBy((post) => {
				const date = new Date(post.date.toUTCString());
				const year = date.getUTCFullYear();
				const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        return `${year}/${month}`;
      })
      .toPairs()
      .reverse()
      .value();
	});

	// Year / Month / Day collection
  eleventyConfig.addCollection('postsByYearMonthDay', (collection) => {
    return _.chain(collection.getAllSorted())
      .filter((item) => 'tags' in item.data && item.data.tags.includes('posts'))
			.groupBy((post) => {
				const date = new Date(post.date.toUTCString());
				const year = date.getUTCFullYear();
				const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
				const day = date.getUTCDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
      })
      .toPairs()
      .reverse()
      .value();
  });

	// Helper filter to format month names
	eleventyConfig.addFilter('monthName', (monthNum) => {
		const date = new Date(2000, parseInt(monthNum) - 1, 1);
		return date.toLocaleString('en-US', { month: 'long' });
	});

	// Helper filters for parsing date parts
	eleventyConfig.addFilter('getYear', (dateStr) => dateStr.split('/')[0]);
	eleventyConfig.addFilter('getMonth', (dateStr) => dateStr.split('/')[1]);
	eleventyConfig.addFilter('getDay', (dateStr) => dateStr.split('/')[2]);

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1, 2, 3, 4],
			slugify: eleventyConfig.getFilter("slugify"),
		});
	});
	eleventyConfig.addShortcode("currentBuildDate", () => {
		return new Date().toISOString();
	});
	// Emulate passthrough copy during "--serve"
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	return {
		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",
		// These are all optional:
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data",
		},
	};
});
