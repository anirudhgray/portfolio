import axios from 'axios';
import './style.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

document.addEventListener('DOMContentLoaded', async () => {
  const res = await axios.get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dorianvalerian&api_key=a4c49534bcda7af16324bec5f1415a50&format=json")
  const data = res.data
  // console.log(data.recenttracks.track[0])

  const latest = data.recenttracks.track[0]
  const artist = latest.artist['#text']
  let image = "#"
  latest.image.forEach((img) => {
    if (img.size === 'medium') image = img['#text']
  })
  const track = latest.name
  const url = latest.url
  const status = latest && latest['@attr'] && latest['@attr'].nowplaying
  if (!status) {
    const timestamp = latest.date.uts
    const uts = dayjs.unix(timestamp)
    const timeAgo = dayjs(uts).fromNow()
    document.querySelector('#track-status').textContent = "Listening "+timeAgo
  }
  
  document.querySelector('#track-img').src = image
  document.querySelector('#track-name').textContent = track
  document.querySelector('#track-name').setAttribute('href', url)
  document.querySelector('#track-artist').textContent = artist
});