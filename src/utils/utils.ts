export function getFileName(content: any) {
  let fileName = '***';
  if (content.previewURL) {
    fileName = content.previewURL;
  }

  if (content.videos) {
    // get the url from the first size that has an url
    const videoUrl = Object.keys(content.videos).find(
      key => content.videos[key].url !== '',
    );

    if (videoUrl) {
      fileName = content.videos[videoUrl].url;
    }
  }

  const endIndex = fileName.indexOf('?');
  const name = fileName.substring(
    fileName.lastIndexOf('/') + 1,
    endIndex > 0 ? endIndex : fileName.length,
  );

  return name;
}
