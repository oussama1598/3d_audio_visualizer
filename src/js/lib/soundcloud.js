const API_KEY = '91f71f725804f4915f4cc95f69fff503';
const API_URL = `https://api.soundcloud.com/resolve.json?url=%URL%&client_id=${API_KEY}`

export async function getStreamUrl(soundcloudUrl) {
  const response = await fetch(
      `${API_URL}`.replace('%URL%', encodeURI(soundcloudUrl))
  );
  const body = await response.json();

  return `${body['stream_url']}?client_id=${API_KEY}`;
}