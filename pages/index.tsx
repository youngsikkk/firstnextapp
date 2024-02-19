import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import homeStyles from '@/styles/Home.module.css'
import { getSortedPostData } from '@/lib/posts'
import Link from 'next/link'
import { GetStaticProps } from 'next'

const inter = Inter({ subsets: ['latin'] })

export default function Home({allPostData}: {
  allPostData : {
    date: string
    title: string
    id: string
    }[]
  }) {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>siuuuu</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Ronaldo Fan Club]</p>
        <p>[This is a website]</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostData.map(({id, date, title}) => 
            <li className={homeStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <h2>{title}</h2>
              </Link>
              <br/>
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>

          )}
        </ul>
      </section>

    </div>
  )
}

export const getStaticProps:GetStaticProps = async() => {
  const allPostData = getSortedPostData();
  return {
    props: {
      allPostData
    }
  }
}