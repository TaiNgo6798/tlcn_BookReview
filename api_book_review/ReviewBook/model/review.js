class Review{
    constructor(
        title,
        kind,
        urlImage,
        nameImage,
        desc,
        uid,
        name
    ){
        this.title = title,
        this.kind = kind,
        this.urlImage = urlImage,
        this.nameImage = nameImage,
        this.desc = desc,
        this.uid = uid,
        this.name = name,
        this.like = 0;
        this.comment = 0;
        this.share = 0;
        this.numberTime = Date.now();
        this.time = new Date().toLocaleString("vi", {
            hour: "numeric",
            minute: "numeric"
        }),
        this.Date = new Date().toLocaleDateString("vi", {
            weekday: "long",
            month: "long",
            day: "2-digit",
            year: "numeric"
        })
    }
}

module.exports = Review;