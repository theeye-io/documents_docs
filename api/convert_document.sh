
accessToken=""
file=""

curl -X POST "https://digitize-api.theeye.io/api/documents/upload?access_token=${accessToken}" -F file=@"${file}"

