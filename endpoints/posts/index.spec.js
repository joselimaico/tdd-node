const postHandlers = require('./index')
describe('endpoints', () => {
    describe('posts', () => {
        describe('post', () => {
            it('should crate a post only by admins', async () => {
                const post = {
                    userId: 1,
                    id: 1,
                    title: "Titulo",
                    body: "Cuerpo del post"
                }
                const users = [
                    {
                        id: 1,
                    },
                    {
                        id: 2,

                    },
                    {
                        id: 3,

                    },]
                const req = {
                    body: post
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn(),
                }
                const axios = {
                    get: jest.fn().mockResolvedValue({data: users}),
                    post: jest.fn().mockResolvedValue({data: {id: 1000}})
                }
                await postHandlers({axios}).post(req, res)

                expect(res.status.mock.calls).toEqual([[201]]);
                expect(axios.get.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users']
                ])
                expect(axios.post.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/posts', post]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{id: 1000}]
                ])


            });
            it('should should not create if userId does not exists', async () => {
                const post = {
                    userId: 3,
                    title: "Titulo",
                    body: "Cuerpo del post"
                }
                const users = [
                    {
                        id: 1,
                    },
                    {
                        id: 2,

                    },
                   ];
                const req = {
                    body: post
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn(),
                    sendStatus: jest.fn()
                }
                const axios = {
                    get: jest.fn().mockResolvedValue({data: users}),
                    post: jest.fn().mockResolvedValue({data: {id: 1000}})
                }
                await postHandlers({axios}).post(req, res)

                expect(axios.post.mock.calls).toEqual([
                ]);
                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ])


            });
        });
    })

});