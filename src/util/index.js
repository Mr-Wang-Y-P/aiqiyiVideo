import axios from 'axios'

export const getPageList = async(params)=>{
    try {
        // 向服务器发送 GET 请求，附带参数
        const response = await axios.get('https://mesh.if.iqiyi.com/portal/lw/videolib/data', { params });
        
        // 如果请求成功，返回数据
        if (response.data.code === 0) {
          return response.data;
        } else {
          throw new Error(`服务器返回状态码：${response?.status}`);
        }
      } catch (error) {
        // 处理请求错误
        console.error('获取页面列表时出错:', error.message);
        return null; // 或者你可以返回一个错误对象，取决于你的应用需求
      }
}

export const searchPage = async(params)=>{
    try {
        // 向服务器发送 GET 请求，附带参数
        const response = await axios.get('https://mesh.if.iqiyi.com/portal/lw/search/homePageV3', { params });
        
        // 如果请求成功，返回数据
        if (response.data.code === 0) {
          return response.data;
        } else {
          throw new Error(`服务器返回状态码：${response?.status}`);
        }
      } catch (error) {
        // 处理请求错误
        console.error('获取页面列表时出错:', error.message);
        return null; // 或者你可以返回一个错误对象，取决于你的应用需求
      }
}

export const getNavList = async()=>{
    try {
        // 向服务器发送 GET 请求，附带参数
        const response = await axios.get('https://mesh.if.iqiyi.com/portal/lw/v5/channel/navigateBar?uid=0&vip=0&auth=&device=005bb7db399a6241b67270177df7011c&v=12.5.15971');
        // 如果请求成功，返回数据
        if (response.data.code === 0) {
          return response.data;
        } else {
          throw new Error(`服务器返回状态码：${response?.status}`);
        }
      } catch (error) {
        // 处理请求错误
        console.error('获取页面列表时出错:', error.message);
        return null; // 或者你可以返回一个错误对象，取决于你的应用需求
      }
}