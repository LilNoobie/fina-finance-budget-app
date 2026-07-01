const _SB_URL='https://bxhhljtnjhwceuthlxct.supabase.co';
const _SB_KEY='sb_publishable_MwSwpszhtm5axyVjgxxgdw_iOYRcwcq';

exports.handler = async (event) => {
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type,Authorization'};
  if(event.httpMethod==='OPTIONS')return{statusCode:200,headers:cors,body:''};
  if(event.httpMethod!=='POST')return{statusCode:405,body:'Method not allowed'};

  // Verify caller is an authenticated Supabase user
  const token=(event.headers['authorization']||'').replace(/^Bearer\s+/,'');
  if(!token)return{statusCode:401,headers:cors,body:'Unauthorized'};
  const userResp=await fetch(`${_SB_URL}/auth/v1/user`,{
    headers:{'Authorization':`Bearer ${token}`,'apikey':_SB_KEY}
  });
  if(!userResp.ok)return{statusCode:401,headers:cors,body:'Unauthorized'};

  try{
    const body=JSON.parse(event.body);
    const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify(body)});
    const data=await resp.json();
    return{statusCode:resp.status,headers:{...cors,'Content-Type':'application/json'},body:JSON.stringify(data)};
  }catch(err){return{statusCode:500,headers:cors,body:JSON.stringify({error:err.message})};}
};
