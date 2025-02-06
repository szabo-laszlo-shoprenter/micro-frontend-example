import axios from 'axios'

const oauthManager = {
    async getAccessToken () {
        try {
            const response = await axios.get('/admin/oauth/token')
            return response.data.access_token || ''
        } catch (error) {
            console.error(error)
            return ''
        }
    }
}

export default oauthManager
