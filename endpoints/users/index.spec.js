const handlers = require('./index');

describe('Endpoints',  ()=> {
    describe('users',  ()=> {
        describe('get',  ()=> {
            it('should return to user json',  async()=> {
                const axios = {
                    get: jest.fn().mockResolvedValue({data:1})
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await handlers({axios}).get({},res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [1]
                ])
            });
        });
        describe('post',  ()=> {
            it('should create a new user',  async()=> {
                const axios = {
                    post: jest.fn().mockResolvedValue({data:{id:1}})
                }
                const req = {
                    body:{name:'test'}
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await handlers({axios}).post(req,res)
                expect(res.status.mock.calls).toEqual([
                    [201]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{id:1}]
                ])
                expect(axios.post.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users',{name:'test'}]
                ])
            });
        });
        describe('put',()=>{
            it('should update an user',  async ()=> {
                const axios = {
                    put: jest.fn()
                }
                const req = {
                    body:{name:'updated name'},
                    params:{id:1}
                }
                const res = {
                    sendStatus: jest.fn()
                }
                await handlers({axios}).put(req,res)
                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ]);
                expect(axios.put.mock.calls).toEqual(
                    [
                        ['https://jsonplaceholder.typicode.com/users/1',{name:"updated name"}],

                    ]
                )
            });
        })
        describe('delete',  ()=> {
            it('should delete an user', async ()=> {
                const axios = {
                    delete: jest.fn()
                }
                const req = {
                    params:{id:1}
                }
                const res = {
                    sendStatus: jest.fn()
                }
                await handlers({axios}).delete(req,res)
                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ]);
                expect(axios.delete.mock.calls).toEqual(
                    [
                        ['https://jsonplaceholder.typicode.com/users/1'],

                    ]
                )
            });
        });
    });
});