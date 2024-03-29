 import fs from 'fs';
 import path from 'path';
 import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

 const postDirectory = path.join(process.cwd(), 'posts');

 export function getSortedPostData() {
  const fileNames = fs.readdirSync(postDirectory);

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/,"");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents= fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data as {date: string; title: string}
    }
  })

  return allPostsData.sort((a,b) => {
    return (a.date < b.date) ? 1 : -1;
  })

 }

export function getAllPostIds () {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData (id: string) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {date: string, title: string})
  }
}