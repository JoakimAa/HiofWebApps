import SupportItem from './SupportItem'
import useFilterIssues from '../hooks/useFilterIssues'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function SupportList({
  issues,
  departmentIdState,
  severityNum,
  setIssueIsDeleted,
  setErrorMessage,
}) {
  const [filteredIssues] = useFilterIssues(
    issues,
    departmentIdState,
    severityNum
  )

  // Loadingscreen
  if (!filteredIssues) {
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
    <ul>
      {filteredIssues?.map((issue) => (
        <SupportItem
          key={issue.id}
          item={issue}
          setIssueIsDeleted={setIssueIsDeleted}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </ul>
  )
}
