class QuestionModel {

    id: string;
    title: string;
    body: string;
    tags: string[];
    answer: { answer: string, author: { name: string }, date: string }[];
    author: { name: string; }

    constructor(id: string, title: string, body: string, tags: string[], answer: {
        answer: string,
        author: { name: string },
        date: string
    }[], author: { name: string }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
        this.answer = answer;
        this.author = author;
    }

}