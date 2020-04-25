const axios = require('axios')
const SparkMD5 = require('spark-md5')

const appid = '20200424000428633'
const secret = 'ptBeUtXqXC0WE4vQUWcx'

module.exports = word => {
  const encodeWord = encodeURIComponent(word)
  const salt = Date.now()
  const sign = SparkMD5.hash(`${appid}${word}${salt}${secret}`)
  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeWord}&from=auto&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`

  return axios(url)
    .then(res => {
      const { trans_result = [] } = res.data
      const first_result = trans_result[0]

      if (!first_result) return ''

      return first_result.dst
    })
    .catch(err => {
      console.log(err)
    })
}
