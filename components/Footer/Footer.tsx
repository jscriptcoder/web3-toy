import { Layout } from 'antd'

export default function Footer() {
  return (
    <Layout.Footer className="text-center">
      Made in 🇪🇸 by{' '}
      <a
        className="underline underline-offset-4 hover:underline"
        href="https://www.linkedin.com/in/jscriptcoder"
        target={'_blank'}
        rel={'noreferrer'}
      >
        Francisco Ramos
      </a>
    </Layout.Footer>
  )
}
