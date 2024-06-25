export class QuestionModel {

    id: string;
    title: string;
    body: string;
    tags: string[];
    answer: {
        id: string,
        answer: string,
        author: { name: string },
        comments: {
            comment: string,
            author: { name: string }
        }[],
        date: string,
    }[];
    author: { name: string; };
    date: string;
    votes: { votes: number; };

    constructor(id: string, title: string, body: string, tags: string[], answer: {
        id: string,
        answer: string,
        author: { name: string },
        comments: {
            comment: string,
            author: { name: string }
        }[],
        date: string,
    }[], author: { name: string }, date: string, votes: { votes: number}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
        this.answer = answer;
        this.author = author;
        this.date = date;
        this.votes = votes;
    }

}