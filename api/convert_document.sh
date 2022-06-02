
accessToken=""
file=""

curl -X POST "https://tagger-api-dev.theeye.io/api/documents/upload?access_token=${accessToken}" -F file=@"${file}"

