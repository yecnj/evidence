import preprocess from '@evidence-dev/preprocess';
import { error } from '@sveltejs/kit';

// Import pages and create an object structure corresponding to the file structure
const pages = import.meta.glob('/src/pages/*/**/+page.md', {
	import: 'default',
	query: 'raw',
	eager: true
});

export const prerender = true;

/**
 * @type {import("@sveltejs/kit").RequestHandler}
 */
export async function GET() {
	try {
		const fileTree = {
			label: 'Home',
			href: '/',
			children: {},
			isTemplated: false
		};
		for (const [pagePath, pageContent] of Object.entries(pages)) {
			const path = pagePath.replace('/src/pages/', '');
			let node = fileTree;
			for (const part of path.split('/')) {
				if (part === '+page.md') {
					if (!path.includes('[')) {
						node.href = encodeURI('/' + path.replace('/+page.md', ''));
					}
					node.frontMatter = preprocess.parseFrontmatter(pageContent);
				} else {
					const label = part.includes('[') ? undefined : part.replace(/_/g, ' ').replace(/-/g, ' ');
					node = node.children[part] = {
						label,
						href: undefined,
						children: {},
						isTemplated: part.includes('[')
					};
				}
			}
		}

		return new Response(JSON.stringify(fileTree));
	} catch {
		throw error(500, 'Failed to build pages manifest.');
	}
}
