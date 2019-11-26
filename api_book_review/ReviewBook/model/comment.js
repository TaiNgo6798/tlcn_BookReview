class Comment{
    constructor(
        id_user,
        body,
        imageUser,
        nameUser){
            this.id_user = id_user,
            this.body = body,
            this.imageUser = imageUser,
            this.nameUser = nameUser,
            this.time = new Date().toLocaleString("vi", {
                hour: "numeric",
                minute: "numeric"
            }),
            this.date = new Date().toLocaleDateString("vi", {
                weekday: "long",
                month: "long",
                day: "2-digit",
                year: "numeric"
            })
        }
}