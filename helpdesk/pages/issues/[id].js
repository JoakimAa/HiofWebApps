import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SupportItem from '../../components/SupportItem'
import useGetIssueById from '../../hooks/useGetIssueById'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Issue = () => {
  const router = useRouter()
  const [id, setId] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [item] = useGetIssueById(id, setErrorMessage)
  const [issueIsDeleted, setIssueIsDeleted] = useState(false)

  useEffect(() => {
    if (!router.isReady) return
    setId(router.query.id)
  }, [router.isReady])


  // Loadingscreen
  if (!item) {
    return (
      <li className="issue loading">
        <div>
          <div className="meta"><span className="grey">
            <Skeleton count={1} width={"70px"} borderRadius={25} />
          </span><span className="severity1">
              <Skeleton count={1} width={"70px"} borderRadius={25} />
            </span></div>
          <h3>
            <Skeleton count={1} width={"180px"} borderRadius={25} height={"25px"} />
          </h3>
          <p>
            <Skeleton count={3} borderRadius={25} width={"100%"} />
          </p>
          <span id="txtCreator" className="grey">
            <Skeleton count={1} borderRadius={25} width={"75px"} />
          </span>
        </div>
        <footer>
          <span id="txtDate" className="grey">
            <Skeleton count={1} borderRadius={25} width={"75px"} />
          </span>
          <div className="issue_actions">
            <Skeleton count={1} borderRadius={25} width={"300px"} />
          </div>
        </footer>
      </li>
    )
  }

  return (
    <section className="issues">
      <ul>
        {errorMessage && <h1>{errorMessage}</h1>}
        {!errorMessage && !issueIsDeleted && <h1>Issue {item?.title}</h1> && (
          <SupportItem
            key={item?.id}
            item={item}
            setIssueIsDeleted={setIssueIsDeleted}
          />
        )}
      </ul>
    </section>
  )
}

export default Issue
