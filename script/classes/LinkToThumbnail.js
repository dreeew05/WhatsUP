export class LinkToThumbnail {

    ytLinkToThumbnail(ytLinks) {
        let ytThumbnails = [];
        for(let i = 0; i < ytLinks.length; i ++) {
            let linkSplit = ytLinks[i].split("="),
                videoCode = linkSplit[linkSplit.length - 1],
                thumbnail = "https://img.youtube.com/vi/".concat(
                            videoCode).concat("/maxresdefault.jpg");
            ytThumbnails.push(thumbnail);
        }
        return ytThumbnails;
    }

}