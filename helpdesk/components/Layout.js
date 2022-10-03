import Header from './Header'

export default function Layout({ children }) {
  return (
    <div id="grid">
      <Header />
      <main className="layout">{children}</main>
    </div>
  )
}
