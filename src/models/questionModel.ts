
/**
 * QuestionModel class.
 * @class
 * @param {string} id - The id of the question.
 * @param {string} title - The title of the question.
 * @param {string} body - The body of the question.
 * @param {string[]} tags - The tags of the question.
 * @param {Object[]} answer - The answers of the question.
 * @param {string} answer.id - The id of the answer.
 * @param {string} answer.answer - The answer text.
 * @param {Object} answer.author - The author of the answer.
 * @param {string} answer.author.name - The name of the author.
 * @param {Object[]} answer.comments - The comments on the answer.
 * @param {string} answer.comments.comment - The comment text.
 * @param {Object} answer.comments.author - The author of the comment.
 * @param {string} answer.comments.author.name - The name of the author.
 * @param {string} answer.date - The date of the answer.
 * @param {Object} author - The author of the question.
 * @param {string} author.name - The name of the author.
 * @param {string} date - The date of the question.
 * @param {Object} votes - The votes of the question.
 * @param {number} votes.votes - The number of votes.
 * @param {number} totalQues - The total number of questions.
 */

// export class QuestionModel {
//
//     id: string;
//     title: string;
//     body: string;
//     tags: string[];
//     answer: {
//         id: string,
//         answer: string,
//         author: { name: string },
//         comments: {
//             comment: string,
//             author: { name: string }
//         }[],
//         date: string,
//     }[];
//     author: { name: string; };
//     date: string;
//     votes: { votes: number; };
//     totalQues: number;
//
//     constructor(id: string, title: string, body: string, tags: string[], answer: {
//         id: string,
//         answer: string,
//         author: { name: string },
//         comments: {
//             comment: string,
//             author: { name: string }
//         }[],
//         date: string,
//     }[], author: { name: string }, date: string, votes: { votes: number}, totalQues: number) {
//         this.id = id;
//         this.title = title;
//         this.body = body;
//         this.tags = tags;
//         this.answer = answer;
//         this.author = author;
//         this.date = date;
//         this.votes = votes;
//         this.totalQues = totalQues;
//     }
//
// }

export class QuestionModel {
    id: string;
    title: string;
    body: string;
    tags: string[];
    answers: AnswerModel[]; // Updated to use a separate AnswerModel
    author: AuthorModel;
    date: string;
    votes: VoteModel;
    totalQues: number;

    constructor(
        id: string,
        title: string,
        body: string,
        tags: string[],
        answers: AnswerModel[], // Updated
        author: AuthorModel,
        date: string,
        votes: VoteModel,
        totalQues: number
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
        this.answers = answers; // Updated
        this.author = author;
        this.date = date;
        this.votes = votes;
        this.totalQues = totalQues;
    }
}

export class AnswerModel {
    id: string;
    answer: string;
    author: AuthorModel;
    comments: CommentModel[]; // Updated to use a separate CommentModel
    votes: VoteModel
    date: string;

    constructor(
        id: string,
        answer: string,
        author: AuthorModel,
        votes: VoteModel,
        comments: CommentModel[], // Updated
        date: string
    ) {
        this.id = id;
        this.answer = answer;
        this.author = author;
        this.comments = comments; // Updated
        this.votes = votes;
        this.date = date;
    }
}

export class CommentModel {
    id: string;
    comment: string;
    author: AuthorModel;

    constructor(id: string, comment: string, author: AuthorModel) {
        this.id = id;
        this.comment = comment;
        this.author = author;
    }
}

export class AuthorModel {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class VoteModel {
    votes: number;

    constructor(votes: number) {
        this.votes = votes;
    }
}