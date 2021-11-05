import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { client } from '../contentful/index'
import Head from 'next/head'
import { IArticle, IArticleFields, IHome, IHomeFields } from '../contentful.d'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Col, Container, Row, Card, CardTitle, CardText, Button } from 'reactstrap'

const Home: NextPage = ({ home, articles }: { home: IHome, articles: IArticle[] }) => {

  return (
    <div>
      <Head>
        <title>{ home.fields.title }</title>
      </Head>

      <main>
        <div
          className='text-center p-5 text-white'
          style={{
            background: `url("${home.fields.background?.fields.file.url}") no-repeat bottom / cover`,
            maxWidth: '100%',
          }}
        >
          <h1 className='mt-5' >{ home.fields.title }</h1>

          <div className='mb-5'>
            {documentToReactComponents(home.fields.description!)}
          </div>
        </div>

        <Container className='pt-5'>
            <Row>
              {articles.map(article => (
                <Col sm={4} key={article.fields.slug}>
                  <Card body>
                    <CardTitle teg='h5'>
                      {article.fields.title}
                    </CardTitle>
                    <CardText>
                      {article.fields.description}
                    </CardText>
                    <Link href={`/articles/${article.fields.slug}`}>
                      <Button>
                        {article.fields.action}
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: 'Home',
    limit: 1
  })

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    select: 'fields.title,fields.slug,fields.description,fields.action'
  })

  const [homePage] = home.items

  return {
    props: {
      title: 'Мой блог',
      home: homePage,
      articles: articleEntries.items
    }
  }
}
