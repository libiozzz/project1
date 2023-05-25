import { v4 as uuidv4 } from 'uuid'
//生成一个随机字符串来作为游客身份，且每次执行一次后就永久存储，不能再改变
export const getUUID = () => {
    //判断本地存储中是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有 就生成一个
    if(!uuid_token){
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}