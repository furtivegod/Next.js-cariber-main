export default function cutCloudflareVideoId(linkVideo: string){
  const listLinkVideo = linkVideo.split("/");
  return listLinkVideo[listLinkVideo.length-1].split("?")[0];
}