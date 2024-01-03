import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
const teamsApiUrl = 'https://apis.ccbp.in/ipl'
class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }
  componentDidMount() {
    this.getTeams()
  }
  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const fetchedData = await response.json()
    const formattedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({
      teamsData: formattedData,
      isLoading: false,
    })
  }
  renderTeamsList = () => {
    const {teamsData} = this.state
    return (
      <ul>
        {teamsData.map(team => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    )
  }
  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )
  render() {
    const {isLoading} = this.state
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1>IPL Dashboard</h1>
        <div>{isLoading ? this.renderLoader() : this.renderTeamsList()}</div>
      </div>
    )
  }
}
export default Home
