module.exports = ({axios})=>({
post: async (req,res)=>{
    const {data:users} = await axios.get('https://jsonplaceholder.typicode.com/users');
    const found =users.find(x=>x.id===req.body.userId);
    if(!found){
        return res.sendStatus(400);
    }

    const {data} = await axios.post('https://jsonplaceholder.typicode.com/posts',req.body);
    return res.status(201).send(data);

}
})