import { getAllPostIds, getPostData, getSortedPostData } from "@/lib/posts"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import postStyle from "../../styles/Post.module.css"

interface PostType {
  contentHtml: string;
  title: string;
  date: string;
}

const Post = ({postData}: {
  postData: PostType
}) => {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </article>
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async() => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback:false
  }
}

export const getStaticProps: GetStaticProps = async({params}) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData
    }
  }
}