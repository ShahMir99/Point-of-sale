import getCurrentUser from '@/actions/getUser'
import SettingsClient from './components/SettingsClient'

const page = async() => {
    const user = await getCurrentUser()
    
  return (
    <div className='p-5 bg-card shadow-md rounded-md'>
    <SettingsClient userdata={user}/>
    </div>
  )
}

export default page